const { join } = require('path');
const { readdirAsync } = require('../setup/files');
const { blockInstallPath, installBlock } = require('../src/steps/step-install');
const { setupComposer, tearDownComposer, composerTimeout } = require('./bootstrap');
const del = require('del');

const {
  eightshiftBlocksModuleName,
} = require('../src/variables');

describe('When installing new block...', () => {
  beforeEach( async() => {
    await setupComposer(eightshiftBlocksModuleName);
  }, composerTimeout);

  afterEach( async() => {
    await tearDownComposer(eightshiftBlocksModuleName);
  }, composerTimeout);

  test('Should confirm installBlock function doesn\t throw errors', async() => {
    const response = await installBlock('example');
    expect(response).toBe(true);
  });

  test('Should confirm installBlock function throws errors on non-existing blocks', async() => {
    await expect(installBlock('asdbvcrgegergerg')).rejects.toThrow(Error);
  });

  test('Should confirm block is installed', async () => {

    await installBlock('example');
    let resp = '';

    try {
      resp = await readdirAsync(join(`${blockInstallPath}/example`));
    } catch(e) {
      resp = e;
    }

    expect(resp).toContain('manifest.json');
  });
});

describe('When extending existing blocks...', () => {
});

