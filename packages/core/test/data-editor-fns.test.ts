import { decodeHTML } from '../src/data-editor/data-editor-fns';

describe('data-editor-fns', () => {
  test('decode html', () => {
    const root = document.createElement('table');
    root.innerHTML = `
            <tbody>
                <tr>
                    <td>1</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>4</td>
                </tr>
            </tbody>
        `;

    const decoded = decodeHTML(root);

    expect(decoded).toEqual([
      ['1', '2'],
      ['3', '4'],
    ]);
  });
});
