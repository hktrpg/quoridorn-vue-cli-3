import JSZip from "jszip";
import saveAs from "file-saver";
import moment from "moment";

/**
 * Store
 */
export default {
  actions: {
    /** ========================================================================
     * 儲存データ新增を開始是
     * @param dispatch
     * @param rootState
     * @param rootGetters
     */
    exportStart({
      dispatch,
      rootState,
      rootGetters
    }: {
      dispatch: Function;
      rootState: any;
      rootGetters: any;
    }) {
      if (rootGetters.members.length === 0) {
        alert("當前不可使用「保存」功能。");
        return;
      }

      // 連想配列的中身を空に是
      for (const playerKey in rootGetters.volatilePrivateData) {
        if (!rootGetters.volatilePrivateData.hasOwnProperty(playerKey))
          continue;
        delete rootGetters.volatilePrivateData[playerKey];
      }

      // privateデータ的複製
      const privateData = JSON.parse(JSON.stringify(rootState.private));

      // 開いてないディスプレイ情報は送信データに含めない
      for (const key in privateData.display) {
        if (!privateData.display.hasOwnProperty(key)) continue;
        if (key === "undefined" || !privateData.display[key].isDisplay) {
          delete privateData.display[key];
        } else {
          delete privateData.display[key].command;
          delete privateData.display[key].zIndex;
        }
      }

      // 自分的privateデータを一時領域に保存是
      rootGetters.volatilePrivateData[rootGetters.playerKey] = privateData;

      // 1人だったら即保存処理、複数人だったらprivateデータをクリエスト是
      if (rootGetters.members.length === 1) {
        dispatch("doExport");
      } else {
        dispatch("sendRoomData", { type: "REQUEST_PRIVATE_DATA", value: null });
      }
    },

    /** ========================================================================
     * 儲存データ新增を実行是
     * @param dispatch
     * @param rootState
     * @param rootGetters
     */
    doExport({
      dispatch,
      rootState,
      rootGetters
    }: {
      dispatch: Function;
      rootState: any;
      rootGetters: any;
    }) {
      // ------------------------------------------------------------
      // 儲存データ的ベース新增
      const saveData = JSON.parse(
        JSON.stringify({
          public: rootState.public,
          dataVersion: "1.0.0"
        })
      );
      saveData.public.room.members = [];

      for (const playerKey in rootGetters.volatilePrivateData) {
        if (!rootGetters.volatilePrivateData.hasOwnProperty(playerKey))
          continue;

        // ------------------------------------------------------------
        // 儲存データ内的player的リストに各玩家的privateデータを持たせる
        const playerPrivateObj: any =
          rootGetters.volatilePrivateData[playerKey];
        saveData.public.player.list.forEach((player: any) => {
          if (player.key !== playerPrivateObj.self.playerKey) return;
          player.private = playerPrivateObj;
        });
      }

      // お試しデータ的カードデッキはとりあえず刪除
      delete saveData.public.deck;

      /*
       * 暗号化
       */
      const encryptObj: Function = (container: any, target: string) => {
        container[target] = rootGetters.encrypt({
          planeText: JSON.stringify(container[target])
        });
      };
      encryptObj(saveData.public, "room");
      encryptObj(saveData.public, "initiative");
      encryptObj(saveData.public, "setting");

      const encryptListObj: Function = (container: any, target: string) => {
        container[target] = container[target].map((obj: any) =>
          rootGetters.encrypt({ planeText: JSON.stringify(obj) })
        );
      };
      encryptListObj(saveData.public.chat, "logs");
      encryptListObj(saveData.public.chat.tab, "list");
      encryptListObj(saveData.public.chat.groupTargetTab, "list");
      encryptListObj(saveData.public.player, "list");
      encryptListObj(saveData.public.chit, "list");
      encryptListObj(saveData.public.character, "list");
      encryptListObj(saveData.public.mapMask, "list");
      encryptListObj(saveData.public.diceSymbol, "list");
      encryptListObj(saveData.public.customDiceBot, "list");
      encryptListObj(saveData.public.customDiceBot, "roomSysList");
      encryptListObj(saveData.public.publicMemo, "list");
      encryptListObj(saveData.public.image, "list");
      encryptListObj(saveData.public.image.tags, "list");
      encryptListObj(saveData.public.bgm, "list");
      encryptListObj(saveData.public.map, "list");
      encryptListObj(saveData.public.counterRemocon, "list");

      // // listに対是差分を取り扱う
      // const addKeyList: string[] = [];
      // const delKeyList: string[] = [];
      // saveData.public.historyList.forEach((history: any) => {
      //   if (history.type === "add") addKeyList.push(history.key);
      //   if (history.type === "del") delKeyList.push(history.key);
      // });
      //
      // // ------------------------------------------------------------
      // // 刪除したデータが新增したデータに含まれている場合は双方的リストから消す
      // const delKeyDelList: string[] = [];
      // delKeyList.forEach((delKey: string) => {
      //   const index = addKeyList.findIndex(
      //     (addKey: string) => addKey === delKey
      //   );
      //   if (index > -1) {
      //     addKeyList.splice(index, 1);
      //     delKeyDelList.push(delKey);
      //   }
      // });
      // delKeyDelList.forEach((delKeyDel: string) =>
      //   delKeyList.splice(
      //     delKeyList.findIndex((delKey: string) => delKey === delKeyDel),
      //     1
      //   )
      // );
      //
      // // ------------------------------------------------------------
      // // こ的時点で刪除リストはプリセットデータ的刪除的みとなっているはず
      // // → 対象的key的リストが保存データに含まれれば、讀取時に十分なデータとなる
      // saveData.delKeyList = delKeyList;
      //
      // // ============================================================
      //
      // // ここからは新增データ間的関連データを調べ、差分データとして用意是
      // const imageKeyList = addKeyList.filter(
      //   key => key.split("-")[0] === "image"
      // );
      //
      // /** -----------------------------------------------------------
      //  * imageKeyListに含まれるなら間接參考keyに変換是
      //  */
      // const getAfterKey = (beforeKey: string) => {
      //   const index: number = imageKeyList.findIndex(
      //     imageKey => imageKey === beforeKey
      //   );
      //   if (index === -1) return beforeKey;
      //   return beforeKey.replace(/[0-9]+/, () => `$${index}`);
      // };
      //
      // const addObjList: any[] = addKeyList.map(key => {
      //   // オブジェクト的データを文字列化し、そこに含まれるイメージkeyを必要に応じて置換是
      //   let objStr = JSON.stringify(rootGetters.getObj(key));
      //   (objStr.match(/image-([0-9])+/g) || []).forEach((imageKey: string) => {
      //     objStr = objStr.replace(
      //       new RegExp(imageKey, "g"),
      //       getAfterKey(imageKey)
      //     );
      //   });
      //   return JSON.parse(objStr);
      //
      //   // // 圖片を持つオブジェクトなら "useImageList" があるはず
      //   // const obj = JSON.parse(JSON.stringify(rootGetters.getObj(key)));
      //   // let useImageList = obj.useImageList;
      //   // if (useImageList) {
      //   //   const useImageKeys = useImageList
      //   //     .split("|")
      //   //     .map((str: string) => str.replace(":R", ""));
      //   //   useImageKeys.forEach((uiKey: string) => {
      //   //     const afterKey = getAfterKey(uiKey);
      //   //     useImageList = useImageList.replace(uiKey, afterKey);
      //   //   });
      //   //   obj.useImageList = useImageList;
      //   // }
      //   // const imageKey = obj.imageKey;
      //   // if (imageKey) {
      //   //   obj.imageKey = getAfterKey(imageKey);
      //   // }
      //   // return obj;
      // });
      //
      // addObjList.forEach(addObj => {
      //   const prefix = addObj.key.split("-")[0];
      //   if (prefix === "image") {
      //     addObj.key = getAfterKey(addObj.key);
      //   } else {
      //     addObj.key = addObj.key.replace(/[0-9]+/, "?");
      //   }
      // });
      //
      // // 新增データに記録されるも的は二重管理となるため刪除
      // delete saveData.public.character;
      // delete saveData.public.chit;
      // delete saveData.public.mapMask;
      // delete saveData.public.image;
      // delete saveData.public.bgm;
      // delete saveData.public.diceSymbol;
      //
      // // 儲存データに新增差分データを含める
      // saveData.addObjList = addObjList;

      // zipファイル的生成
      const zip = new JSZip();
      zip.file("save.json", JSON.stringify(saveData, undefined, 2));
      zip.generateAsync({ type: "blob" }).then((blob: any) => {
        const dateStr = moment().format("YYYYMMDD_HHmmss");
        saveAs(blob, `Quoridorn_${dateStr}.zip`);
      });
    },

    /** ========================================================================
     *
     * @param dispatch
     * @param rootState
     * @param zipFiles
     * @param isRoomCreate
     */
    importStart(
      { dispatch, rootState }: { dispatch: Function; rootState: any },
      { zipFiles, isRoomCreate }: { zipFiles: any[]; isRoomCreate: boolean }
    ) {
      const zip: any = new JSZip();
      const zipList: any[] = [];
      const promiseList: PromiseLike<any>[] = zipFiles.map(
        zipFile =>
          new Promise(resolve => {
            zip.loadAsync(zipFile).then((zip: any) => {
              // you now have every files contained in the loaded zip
              zip
                .file("save.json")
                .async("string")
                .then((jsonStr: string) => {
                  const saveData = JSON.parse(jsonStr);
                  if (!isRoomCreate) {
                    delete saveData.public.room.name;
                    delete saveData.public.room.members;
                    delete saveData.public.room.password;
                    delete saveData.public.player;
                    delete saveData.public.chat;
                    delete saveData.public.customDiceBot;
                  }
                  zipList.push({
                    fileName: zipFile.name,
                    saveData: saveData
                  });
                  resolve();
                });
            });
          })
      );
      Promise.all(promiseList).then(() => {
        rootState.private.display.dropZipWindow.zipList = zipList;
        rootState.private.display.dropZipWindow.isRoomCreate = isRoomCreate;
        dispatch("windowOpen", "private.display.dropZipWindow");
      });
    },

    /** ========================================================================
     *
     * @param dispatch
     * @param commit
     * @param rootState
     * @param rootGetters
     * @param publicData
     * @param dataVersion
     * @param delKeyList
     * @param addObjList
     * @param dropZipRoomCreate
     */
    doImport(
      {
        dispatch,
        commit,
        rootState,
        rootGetters
      }: { dispatch: Function; commit: any; rootState: any; rootGetters: any },
      {
        publicData,
        dataVersion,
        delKeyList,
        addObjList,
        dropZipRoomCreate
      }: {
        publicData: any;
        dataVersion: string;
        delKeyList: string[];
        addObjList: any[];
        dropZipRoomCreate: boolean;
      }
    ) {
      /*
       * 復号化
       */
      const decryptObj: Function = (container: any, target: string) => {
        container[target] = JSON.parse(
          rootGetters.decrypt({ cipherText: container[target] })
        );
      };
      decryptObj(publicData, "room");
      decryptObj(publicData, "initiative");
      decryptObj(publicData, "setting");

      const decryptListObj: Function = (container: any, target: string) => {
        container[target] = container[target].map((cipherText: string) =>
          JSON.parse(rootGetters.decrypt({ cipherText }))
        );
      };
      decryptListObj(publicData.chat, "logs");
      decryptListObj(publicData.chat.tab, "list");
      decryptListObj(publicData.chat.groupTargetTab, "list");
      decryptListObj(publicData.player, "list");
      decryptListObj(publicData.chit, "list");
      decryptListObj(publicData.character, "list");
      decryptListObj(publicData.mapMask, "list");
      decryptListObj(publicData.diceSymbol, "list");
      decryptListObj(publicData.customDiceBot, "list");
      decryptListObj(publicData.customDiceBot, "roomSysList");
      decryptListObj(publicData.publicMemo, "list");
      decryptListObj(publicData.image, "list");
      decryptListObj(publicData.image.tags, "list");
      decryptListObj(publicData.bgm, "list");
      decryptListObj(publicData.map, "list");
      decryptListObj(publicData.counterRemocon, "list");

      const importFunc = () => {
        // FIXME チャットデータは覆蓋でいい的…かな？（差分方式がいい気もしている
        dispatch("setProperty", {
          property: "public",
          value: publicData,
          isNotice: true,
          logOff: true
        }).then(() => {
          dispatch("setInitiativeParams", {
            format: rootGetters.rowStr.trim()
          });
        });

        return Promise.resolve();

        /*

        delKeyList.forEach(delKey => {
          dispatch("delObj", delKey);
        });

        // 圖片的みを先行して新增し、割り振られるkeyを他的オブジェクトから參考させる
        const imageAddPromiseList: PromiseLike<any>[] = addObjList
          .filter(addObj => addObj.key.split("-")[0] === "image")
          .map(addObj =>
            dispatch("addImage", {
              tag: addObj.tag,
              data: addObj.data,
              owner: addObj.owner
            })
          );

        return Promise.all([...imageAddPromiseList]).then(
          (imageList: string[]) => {
            // 圖片を全て読み込み終えたら、他的オブジェクト的新增を処理是
            const otherObjectPromiseList = addObjList
              // 圖片以外を処理対象と是
              .filter(addObj => addObj.key.split("-")[0] !== "image")
              .map(addObj => {
                const type = addObj.key.split("-")[0];

                // // image參考的差分讀取
                // let useImageList: string = addObj.useImageList;
                // if (useImageList) {
                //   useImageList.split("|").forEach(useImage => {
                //     const matchResult = useImage.match(/image-\$([0-9]+)/);
                //     if (matchResult) {
                //       useImageList = useImageList.replace(
                //         matchResult[0],
                //         imageList[parseInt(matchResult[1])]
                //       );
                //     }
                //   });
                // }
                // addObj.useImageList = useImageList;

                let addObjStr = JSON.stringify(addObj);
                addObjStr = addObjStr.replace(
                  /image-\$[0-9]+/g,
                  (str: string) => {
                    const index: number = parseInt(
                      str.replace("image-$", ""),
                      10
                    );
                    return imageList[index];
                  }
                );
                addObj = JSON.parse(addObjStr);

                // グループチャットデータ的讀取
                if (type === "groupTargetTab") {
                  rootGetters.groupTargetTabList.push({
                    key: `groupTargetTab-${++rootGetters.groupTargetTab
                      .maxKey}`,
                    isSecret: addObj.isSecret,
                    name: addObj.name,
                    targetTab: addObj.targetTab,
                    isAll: addObj.isAll,
                    group: addObj.group
                  });
                  return;
                }

                delete addObj.key;

                // リストに新增
                return dispatch("addListObj", addObj);
              });
            return Promise.all(otherObjectPromiseList);
          }
        );
        */
      };

      const roomName = publicData.room.name;
      const system = publicData.room.system;
      if (!dropZipRoomCreate) {
        // 房間を作らないシンプルな讀取
        importFunc().then(() => {});
        return;
      }
      if (!publicData.room) {
        // 房間を作る操作な的に儲存データに房間情報が含まれてないならここで終わり
        alert("沒有房間信息。 \n停止處理。");
        return;
      }
      dispatch("loading", true);
      // 儲存データに房間情報があるなら、進房処理を行う
      const checkFunc = (roomName: string) => {
        // 房間的存在檢查
        Promise.resolve()
          .then(() => dispatch("simpleJoinRoom", { roomName: roomName }))
          .then((peerId: string) => {
            // const logTexts = [];
            // logTexts.push(`create room by peer:"${peerId}"`);
            // logTexts.push(`本番: ${rootGetters.peerId(false)}`);
            // logTexts.push(`待ち: ${rootGetters.peerId(true)}`);
            // window.console.log(logTexts.join(", "));
            return dispatch("checkRoomName", { roomName: roomName });
          })
          .then((isExist: boolean) => {
            if (isExist) {
              // 既存房間と房間名が衝突しちゃったら回避是
              const msg: string[] = [];
              msg.push(`房間「${roomName}」已經存在。`);
              msg.push(`變更房間名稱然後重試？`);
              const result = window.confirm(msg.join("\n"));
              if (result) {
                const inputRoomNameFunc = (): string | null => {
                  const inputStr: string | null = window.prompt("新的房間名");
                  if (inputStr === null) {
                    if (window.confirm("停止載入？")) return null;
                  }
                  return inputStr || inputRoomNameFunc();
                };
                const newRoomName = inputRoomNameFunc();
                if (!newRoomName) return;

                checkFunc(newRoomName);
              }
              return;
            }

            // データインポート
            importFunc()
              .then(
                () =>
                  new Promise((resolve: Function) => {
                    // 玩家情報を入力してもらう
                    dispatch("setProperty", {
                      property: "private.display.inputPlayerInfoWindow",
                      value: {
                        roomName,
                        playerName: "",
                        playerPassword: "",
                        playerType: "PL",
                        fontColor: "#000000",
                        resolve
                      },
                      logOff: true
                    });
                    dispatch(
                      "windowOpen",
                      "private.display.inputPlayerInfoWindow"
                    );
                  })
              )
              // 玩家情報を入力してもらったら房間を新的新增して進房是
              .then((payload: any) => {
                // privateデータ的復元
                const playerData: any = publicData.player.list.filter(
                  (player: any) => player.name === payload.playerName
                )[0];
                if (playerData) {
                  const privateData: any = playerData.private;
                  dispatch("setProperty", {
                    property: "private",
                    value: privateData,
                    isNotice: false,
                    logOff: true
                  });
                }
                return dispatch("doNewRoom", {
                  roomName,
                  roomPassword: publicData.room.password || "",
                  playerName: payload.playerName,
                  playerPassword: payload.playerPassword,
                  playerType: payload.playerType || "PL",
                  fontColor: payload.fontColor,
                  system
                });
              })
              .then(() => dispatch("loading", false))
              .catch(() => dispatch("loading", false));
          });
      };
      checkFunc(roomName);
    }
  }
};
