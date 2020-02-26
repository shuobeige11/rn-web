**Usage**

This project support both Native and Web<br>
Clone and yarn:

### `yarn`

开启xcode项目
### `open ios/rndev.xcodeproj`

点左上角build<br>

如果遇到报错，如 config.h not found 或者跟 third-party 有关执行下面命令

### `rm -rf node_modules/ && yarn cache clean && yarn install`
### `node_modules/react-native/scripts/ios-install-third-party.sh`
### `cd node_modules/react-native/third-party/glog-0.3.4`
### `./configure`
### `make`
### `make install`

### `yarn start_rn`

开启本地RN开发服务 <br>

### `yarn start`

开启本地web开发服务

**生产发布**

### `yarn common_ios`
打rn公共包（本地打一次即可，除非大版本升级）
### `yarn bundle_ios`
打rn业务包 （一般只更新上传这个）
### `yarn build`
web打包

copyright@ymm56


