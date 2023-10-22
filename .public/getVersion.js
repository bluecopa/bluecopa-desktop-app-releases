const getVersion = async (bumpType) => {
    //bumpType can be major, minor, or patch

    if(!bumpType){
        return 'v0.0.1';
    }

    const response = await fetch('https://api.github.com/repos/bluecopa/bluecopa-desktop-app-releases/releases/latest')
    const responseReleaseJson = await response.json();
    const latestVersion = responseReleaseJson['version'];

    if(!latestVersion){
        return 'v0.0.1';
    }

    const latestVersionWithoutV = latestVersion.replace('v', '');

    const versionSplits = latestVersionWithoutV.split['.'];
    const lMajor = parseInt(versionSplits[0]);
    const lMinor = parseInt(versionSplits[1]);
    const lPatch = parseInt(versionSplits[2]);

    if(bumpType === 'major'){
        const majorBump = lMajor + 1;
        return `v${majorBump}.0.0`;
    }

    if(bumpType === 'minor'){
        return `v${lMajor}.${lMinor+1}.0`;
    }

    if(bumpType === 'patch'){
        return `v${lMajor}.${lMinor}.${lPatch+1}`;
    }
    
}

const getVersion= (argv)=>{
    const bumpType = argv[2];
    const result = await getVersion(bumpType);
    return result;
}

module.exports = { getVersion }