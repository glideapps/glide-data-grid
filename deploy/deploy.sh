set -o errexit

# Get the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY from Vault.
export VAULT_TOKEN="$(vault write -field=token auth/gitlab-jwt/login role=${VAULT_ROLE_ID}-${CI_PROJECT_ID} jwt=${CI_JOB_JWT})"

export AWS_ACCESS_KEY_ID=$(vault kv get -field=AWS_ACCESS_KEY_ID ${VAULT_ROLE_ID}/phoenix-design-system)
export AWS_SECRET_ACCESS_KEY=$(vault kv get -field=AWS_SECRET_ACCESS_KEY ${VAULT_ROLE_ID}/phoenix-design-system)

aws s3 sync ./public/ "s3://private-phoenix-design-guide/review/${CI_PROJECT_ID}/${CI_COMMIT_REF_NAME}"
