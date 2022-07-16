#!/use/bin/sh
echo "starting fetching playground"
git config pull.rebase false

# check if windows os then exit
if [ "$(uname)" == "Windows" ]; then 
    echo "windows os is not support"
    exit 1
fi

# variables
BRANCH_NAMESPACE="sura-ui"

# fetching submodule
sh ./scripts/fetch-submodule.sh

# gogym 
cd playground/gogym-pos
git fetch --all
git checkout $BRANCH_NAMESPACE -f 
git pull origin $BRANCH_NAMESPACE

cd ..

# asurraa-starter
cd asurraa-react-admin-starter
git fetch --all
git checkout $BRANCH_NAMESPACE -f
git pull origin $BRANCH_NAMESPACE

echo "==> back to root dir <=="
cd ../../