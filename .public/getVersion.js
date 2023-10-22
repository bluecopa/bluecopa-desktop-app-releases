const { promisify } = require('util');
const exec = promisify(require('child_process').exec)

module.exports.getVersionParseRelease = async function (argv) {
    //bumpType can be major, minor, or patch
    const bumpType = argv;

    if (!bumpType) {
        return 'v0.0.1';
    }

    const response = await fetch('https://api.github.com/repos/bluecopa/bluecopa-desktop-app-releases/releases/latest')
    const responseReleaseJson = await response.json();
    const latestVersion = responseReleaseJson['tag_name'];

    if (!latestVersion) {
        return 'v0.0.1';
    }

    const latestVersionWithoutV = latestVersion.replace('v', '');

    const versionSplits = latestVersionWithoutV.split('.');
    const lMajor = parseInt(versionSplits[0]);
    const lMinor = parseInt(versionSplits[1]);
    const lPatch = parseInt(versionSplits[2]);

    if (bumpType === 'major') {
        const majorBump = lMajor + 1;
        return `v${majorBump}.0.0`;
    }

    if (bumpType === 'minor') {
        return `v${lMajor}.${lMinor + 1}.0`;
    }

    if (bumpType === 'patch') {
        return `v${lMajor}.${lMinor}.${lPatch + 1}`;
    }

}

module.exports.getVersion = async function (argv) {
    const bumpType = argv;
    console.log('bumpType', bumpType);
    const versionOutput = await exec(`npx -y run-func .public/getVersion.js  'patch'`);
    return versionOutput.stdout.trim();
}


