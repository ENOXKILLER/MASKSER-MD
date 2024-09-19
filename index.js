'use strict';

var __createBinding = this && this.__createBinding || (Object.create ? function (_0x324100, _0x5289bd, _0x9084ee, _0x1e5813) {
  if (_0x1e5813 === undefined) {
    _0x1e5813 = _0x9084ee;
  }
  var _0x41a40a = Object.getOwnPropertyDescriptor(_0x5289bd, _0x9084ee);
  if (!_0x41a40a || ("get" in _0x41a40a ? !_0x5289bd.__esModule : _0x41a40a.writable || _0x41a40a.configurable)) {
    _0x41a40a = {
      'enumerable': true,
      'get': function () {
        return _0x5289bd[_0x9084ee];
      }
    };
  }
  Object.defineProperty(_0x324100, _0x1e5813, _0x41a40a);
} : function (_0x390bbe, _0x976fe8, _0x1981bf, _0x3a0a8b) {
  if (_0x3a0a8b === undefined) {
    _0x3a0a8b = _0x1981bf;
  }
  _0x390bbe[_0x3a0a8b] = _0x976fe8[_0x1981bf];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x6e8c76, _0x6732f4) {
  Object.defineProperty(_0x6e8c76, "default", {
    'enumerable': true,
    'value': _0x6732f4
  });
} : function (_0x5a5ed0, _0xdf1333) {
  _0x5a5ed0["default"] = _0xdf1333;
});
var __importStar = this && this.__importStar || function (_0x4f02e0) {
  if (_0x4f02e0 && _0x4f02e0.__esModule) {
    return _0x4f02e0;
  }
  var _0x29563 = {};
  if (_0x4f02e0 != null) {
    for (var _0x5745fa in _0x4f02e0) if (_0x5745fa !== "default" && Object.prototype.hasOwnProperty.call(_0x4f02e0, _0x5745fa)) {
      __createBinding(_0x29563, _0x4f02e0, _0x5745fa);
    }
  }
  __setModuleDefault(_0x29563, _0x4f02e0);
  return _0x29563;
};
var __importDefault = this && this.__importDefault || function (_0xd7ac1) {
  return _0xd7ac1 && _0xd7ac1.__esModule ? _0xd7ac1 : {
    'default': _0xd7ac1
  };
};
Object.defineProperty(exports, "__esModule", {
  'value': true
});
const baileys_1 = __importStar(require('@whiskeysockets/baileys'));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1['default'].child({});
logger.level = "silent";
const pino = require("pino");
const boom_1 = require('@hapi/boom');
const conf = require("./set");
let fs = require("fs-extra");
let path = require("path");
const FileType = require("file-type");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  verifierEtatJid,
  recupererActionJid
} = require("./bdd/antilien");
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require('./bdd/antibot');
let evt = require(__dirname + "/framework/zokou");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require('./bdd/banUser');
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./bdd/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./bdd/onlyAdmin");
let {
  reagir
} = require(__dirname + "/framework/app");
var session = conf.session.replace(/MASKSER-MD;;;=>/g, '');
const prefixe = conf.PREFIXE;
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + '/auth/creds.json')) {
      console.log("connexion en cour ...");
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/auth/creds.json") && session != 'zokk') {
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
    }
  } catch (_0x3e69d1) {
    console.log("Session Invalide " + _0x3e69d1);
    return;
  }
}
authentification();
0x0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': 'silent',
    'stream': 'store'
  })
});
setTimeout(() => {
  async function _0x571006() {
    0x0;
    const {
      version: _0x53acf4,
      isLatest: _0x3462c6
    } = await baileys_1.fetchLatestBaileysVersion();
    0x0;
    const {
      state: _0x207fdc,
      saveCreds: _0x10ab0d
    } = await baileys_1.useMultiFileAuthState(__dirname + "/auth");
    0x0;
    const _0xd9a585 = {
      'version': _0x53acf4,
      'logger': pino({
        'level': "silent"
      }),
      'browser': ['MASKSER-MD', 'safari', "1.0.0"],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x207fdc.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x207fdc.keys, logger)
      },
      'getMessage': async _0x4b64ba => {
        if (store) {
          const _0x26a283 = await store.loadMessage(_0x4b64ba.remoteJid, _0x4b64ba.id, undefined);
          return _0x26a283.message || undefined;
        }
        return {
          'conversation': "An Error Occurred, Repeat Command!"
        };
      }
    };
    0x0;
    const _0x41157d = baileys_1["default"](_0xd9a585);
    store.bind(_0x41157d.ev);
    setInterval(() => {
      store.writeToFile("store.json");
    }, 0xbb8);
    _0x41157d.ev.on("messages.upsert", async _0xfdcf33 => {
      const {
        messages: _0x3f3d21
      } = _0xfdcf33;
      const _0x3029c4 = _0x3f3d21[0x0];
      if (!_0x3029c4.message) {
        return;
      }
      const _0x34455c = _0x376072 => {
        if (!_0x376072) {
          return _0x376072;
        }
        if (/:\d+@/gi.test(_0x376072)) {
          0x0;
          let _0x3d5b42 = baileys_1.jidDecode(_0x376072) || {};
          return _0x3d5b42.user && _0x3d5b42.server && _0x3d5b42.user + '@' + _0x3d5b42.server || _0x376072;
        } else {
          return _0x376072;
        }
      };
      0x0;
      var _0x59690b = baileys_1.getContentType(_0x3029c4.message);
      var _0x256b45 = _0x59690b == "conversation" ? _0x3029c4.message.conversation : _0x59690b == "imageMessage" ? _0x3029c4.message.imageMessage?.['caption'] : _0x59690b == "videoMessage" ? _0x3029c4.message.videoMessage?.['caption'] : _0x59690b == "extendedTextMessage" ? _0x3029c4.message?.["extendedTextMessage"]?.['text'] : _0x59690b == 'buttonsResponseMessage' ? _0x3029c4?.["message"]?.['buttonsResponseMessage']?.['selectedButtonId'] : _0x59690b == "listResponseMessage" ? _0x3029c4.message?.['listResponseMessage']?.["singleSelectReply"]?.['selectedRowId'] : _0x59690b == "messageContextInfo" ? _0x3029c4?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x3029c4.message?.['listResponseMessage']?.["singleSelectReply"]?.["selectedRowId"] || _0x3029c4.text : '';
      var _0x2a9ad4 = _0x3029c4.key.remoteJid;
      var _0x57354f = _0x34455c(_0x41157d.user.id);
      var _0x5091c9 = _0x57354f.split('@')[0x0];
      const _0x30d651 = _0x2a9ad4?.["endsWith"]("@g.us");
      var _0x377027 = _0x30d651 ? await _0x41157d.groupMetadata(_0x2a9ad4) : '';
      var _0x229479 = _0x30d651 ? _0x377027.subject : '';
      var _0x584b88 = _0x3029c4.message.extendedTextMessage?.["contextInfo"]?.['quotedMessage'];
      var _0x559b3b = _0x34455c(_0x3029c4.message?.["extendedTextMessage"]?.["contextInfo"]?.["participant"]);
      var _0x9e4074 = _0x30d651 ? _0x3029c4.key.participant ? _0x3029c4.key.participant : _0x3029c4.participant : _0x2a9ad4;
      if (_0x3029c4.key.fromMe) {
        _0x9e4074 = _0x57354f;
      }
      var _0x5bf6f9 = _0x30d651 ? _0x3029c4.key.participant : '';
      const {
        getAllSudoNumbers: _0x8e88ed
      } = require("./bdd/sudo");
      const _0x42c9ce = _0x3029c4.pushName;
      const _0x12fc29 = await _0x8e88ed();
      const _0x1514e3 = [_0x5091c9, '255656128735', "255656128735", "255656128735", '255656128735', conf.NUMERO_OWNER].map(_0x4ee16c => _0x4ee16c.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const _0x3c3f7b = _0x1514e3.concat(_0x12fc29);
      const _0x468ada = _0x3c3f7b.includes(_0x9e4074);
      var _0x59d6eb = ['255656128735', "255656128735", "255656128735", '255656128735'].map(_0x30d7a3 => _0x30d7a3.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x9e4074);
      function _0x1d2c8f(_0x22c561) {
        _0x41157d.sendMessage(_0x2a9ad4, {
          'text': _0x22c561
        }, {
          'quoted': _0x3029c4
        });
      }
      console.log("\t [][]...MASKER_MD}...[][]");
      console.log("=========== Nouveau message ===========");
      if (_0x30d651) {
        console.log("message provenant du groupe : " + _0x229479);
      }
      console.log("message envoyé par : [" + _0x42c9ce + " : " + _0x9e4074.split("@s.whatsapp.net")[0x0] + " ]");
      console.log("type de message : " + _0x59690b);
      console.log("------ contenu du message ------");
      console.log(_0x256b45);
      function _0xd5347e(_0x406b49) {
        let _0xe19b03 = [];
        for (_0xfdcf33 of _0x406b49) {
          if (_0xfdcf33.admin == null) {
            continue;
          }
          _0xe19b03.push(_0xfdcf33.id);
        }
        return _0xe19b03;
      }
      var _0x132f3e = conf.ETAT;
      if (_0x132f3e == 0x1) {
        await _0x41157d.sendPresenceUpdate('available', _0x2a9ad4);
      } else {
        if (_0x132f3e == 0x2) {
          await _0x41157d.sendPresenceUpdate("composing", _0x2a9ad4);
        } else if (_0x132f3e == 0x3) {
          await _0x41157d.sendPresenceUpdate("recording", _0x2a9ad4);
        } else {
          await _0x41157d.sendPresenceUpdate("unavailable", _0x2a9ad4);
        }
      }
      const _0x2bf6ac = _0x30d651 ? await _0x377027.participants : '';
      let _0x22b1cf = _0x30d651 ? _0xd5347e(_0x2bf6ac) : '';
      const _0x303c9f = _0x30d651 ? _0x22b1cf.includes(_0x9e4074) : false;
      var _0x3bb635 = _0x30d651 ? _0x22b1cf.includes(_0x57354f) : false;
      const _0x1526f6 = _0x256b45 ? _0x256b45.trim().split(/ +/).slice(0x1) : null;
      const _0x59bdbe = _0x256b45 ? _0x256b45.startsWith(prefixe) : false;
      const _0x495f01 = _0x59bdbe ? _0x256b45.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x1a8e79 = conf.URL.split(',');
      function _0x2406fd() {
        const _0x306f8f = Math.floor(Math.random() * _0x1a8e79.length);
        const _0xcfd509 = _0x1a8e79[_0x306f8f];
        return _0xcfd509;
      }
      var _0x24ce86 = {
        'superUser': _0x468ada,
        'dev': _0x59d6eb,
        'verifGroupe': _0x30d651,
        'mbre': _0x2bf6ac,
        'membreGroupe': _0x5bf6f9,
        'verifAdmin': _0x303c9f,
        'infosGroupe': _0x377027,
        'nomGroupe': _0x229479,
        'auteurMessage': _0x9e4074,
        'nomAuteurMessage': _0x42c9ce,
        'idBot': _0x57354f,
        'verifzokouAdmin': _0x3bb635,
        'prefixe': prefixe,
        'arg': _0x1526f6,
        'repondre': _0x1d2c8f,
        'mtype': _0x59690b,
        'groupeAdmin': _0xd5347e,
        'msgRepondu': _0x584b88,
        'auteurMsgRepondu': _0x559b3b,
        'ms': _0x3029c4,
        'mybotpic': _0x2406fd
      };
      if (_0x3029c4.message.protocolMessage && _0x3029c4.message.protocolMessage.type === 0x0 && conf.ADM.toLocaleLowerCase() === "yes") {
        if (_0x3029c4.key.fromMe || _0x3029c4.message.protocolMessage.key.fromMe) {
          console.log("Message supprimer me concernant");
          return;
        }
        console.log("Message supprimer");
        let _0x7c3fd3 = _0x3029c4.message.protocolMessage.key;
        try {
          const _0xc699a0 = fs.readFileSync("./store.json", "utf8");
          const _0x56285d = JSON.parse(_0xc699a0);
          let _0xfe3bfa = _0x56285d.messages[_0x7c3fd3.remoteJid];
          let _0x1f220a;
          for (let _0x13af2b = 0x0; _0x13af2b < _0xfe3bfa.length; _0x13af2b++) {
            if (_0xfe3bfa[_0x13af2b].key.id === _0x7c3fd3.id) {
              _0x1f220a = _0xfe3bfa[_0x13af2b];
              break;
            }
          }
          if (_0x1f220a === null || !_0x1f220a || _0x1f220a === "undefined") {
            console.log("Message non trouver");
            return;
          }
          await _0x41157d.sendMessage(_0x57354f, {
            'image': {
              'url': "./media/deleted-message.jpg"
            },
            'caption': "        🕷️Anti-delete-message by Fredie Tech🕷️\n Message from @" + _0x1f220a.key.participant.split('@')[0x0] + '​',
            'mentions': [_0x1f220a.key.participant]
          }).then(() => {
            _0x41157d.sendMessage(_0x57354f, {
              'forward': _0x1f220a
            }, {
              'quoted': _0x1f220a
            });
          });
        } catch (_0x4ad910) {
          console.log(_0x4ad910);
        }
      }
      if (_0x3029c4.key && _0x3029c4.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === 'yes') {
        await _0x41157d.readMessages([_0x3029c4.key]);
      }
      if (_0x3029c4.key && _0x3029c4.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === 'yes') {
        if (_0x3029c4.message.extendedTextMessage) {
          var _0x2d8cc1 = _0x3029c4.message.extendedTextMessage.text;
          await _0x41157d.sendMessage(_0x57354f, {
            'text': _0x2d8cc1
          }, {
            'quoted': _0x3029c4
          });
        } else {
          if (_0x3029c4.message.imageMessage) {
            var _0xc84d84 = _0x3029c4.message.imageMessage.caption;
            var _0x593917 = await _0x41157d.downloadAndSaveMediaMessage(_0x3029c4.message.imageMessage);
            await _0x41157d.sendMessage(_0x57354f, {
              'image': {
                'url': _0x593917
              },
              'caption': _0xc84d84
            }, {
              'quoted': _0x3029c4
            });
          } else {
            if (_0x3029c4.message.videoMessage) {
              var _0xc84d84 = _0x3029c4.message.videoMessage.caption;
              var _0x545d55 = await _0x41157d.downloadAndSaveMediaMessage(_0x3029c4.message.videoMessage);
              await _0x41157d.sendMessage(_0x57354f, {
                'video': {
                  'url': _0x545d55
                },
                'caption': _0xc84d84
              }, {
                'quoted': _0x3029c4
              });
            }
          }
        }
      }
      if (!_0x59d6eb && _0x2a9ad4 == "120363158701337904@g.us") {
        return;
      }
      if (_0x256b45 && _0x9e4074.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData: _0x3b6d74
        } = require("./bdd/level");
        try {
          await _0x3b6d74(_0x9e4074);
        } catch (_0x265d51) {
          console.error(_0x265d51);
        }
      }
      try {
        if (_0x3029c4.message[_0x59690b].contextInfo.mentionedJid && (_0x3029c4.message[_0x59690b].contextInfo.mentionedJid.includes(_0x57354f) || _0x3029c4.message[_0x59690b].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + '@s.whatsapp.net'))) {
          if (_0x2a9ad4 == "120363158701337904@g.us") {
            return;
          }
          ;
          if (_0x468ada) {
            console.log('hummm');
            return;
          }
          let _0x4cbb16 = require("./bdd/mention");
          let _0x511791 = await _0x4cbb16.recupererToutesLesValeurs();
          let _0xf9849f = _0x511791[0x0];
          if (_0xf9849f.status === "non") {
            console.log("mention pas actifs");
            return;
          }
          let _0x466869;
          if (_0xf9849f.type.toLocaleLowerCase() === "image") {
            _0x466869 = {
              'image': {
                'url': _0xf9849f.url
              },
              'caption': _0xf9849f.message
            };
          } else {
            if (_0xf9849f.type.toLocaleLowerCase() === "video") {
              _0x466869 = {
                'video': {
                  'url': _0xf9849f.url
                },
                'caption': _0xf9849f.message
              };
            } else {
              if (_0xf9849f.type.toLocaleLowerCase() === 'sticker') {
                let _0x3420cd = new Sticker(_0xf9849f.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': "12345",
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0x849fee = await _0x3420cd.toBuffer();
                _0x466869 = {
                  'sticker': _0x849fee
                };
              } else if (_0xf9849f.type.toLocaleLowerCase() === 'audio') {
                _0x466869 = {
                  'audio': {
                    'url': _0xf9849f.url
                  },
                  'mimetype': "audio/mp4"
                };
              }
            }
          }
          _0x41157d.sendMessage(_0x2a9ad4, _0x466869, {
            'quoted': _0x3029c4
          });
        }
      } catch (_0x10752b) {}
      try {
        const _0x59d8da = await verifierEtatJid(_0x2a9ad4);
        if (_0x256b45.includes('https://') && _0x30d651 && _0x59d8da) {
          console.log("lien detecté");
          var _0x51e1ae = _0x30d651 ? _0x22b1cf.includes(_0x57354f) : false;
          if (_0x468ada || _0x303c9f || !_0x51e1ae) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x4a456e = {
            'remoteJid': _0x2a9ad4,
            'fromMe': false,
            'id': _0x3029c4.key.id,
            'participant': _0x9e4074
          };
          var _0x394f96 = "lien detected, \n";
          var _0x5e05f3 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "Masker-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x5e05f3.toFile("st1.webp");
          var _0x8b4429 = await recupererActionJid(_0x2a9ad4);
          if (_0x8b4429 === 'remove') {
            _0x394f96 += "message deleted \n @" + _0x9e4074.split('@')[0x0] + " removed from group.";
            await _0x41157d.sendMessage(_0x2a9ad4, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x41157d.sendMessage(_0x2a9ad4, {
              'text': _0x394f96,
              'mentions': [_0x9e4074]
            }, {
              'quoted': _0x3029c4
            });
            try {
              await _0x41157d.groupParticipantsUpdate(_0x2a9ad4, [_0x9e4074], "remove");
            } catch (_0x225593) {
              console.log("antiien ") + _0x225593;
            }
            await _0x41157d.sendMessage(_0x2a9ad4, {
              'delete': _0x4a456e
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x8b4429 === "delete") {
              _0x394f96 += "message deleted \n @" + _0x9e4074.split('@')[0x0] + " avoid sending link.";
              await _0x41157d.sendMessage(_0x2a9ad4, {
                'text': _0x394f96,
                'mentions': [_0x9e4074]
              }, {
                'quoted': _0x3029c4
              });
              await _0x41157d.sendMessage(_0x2a9ad4, {
                'delete': _0x4a456e
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x8b4429 === "warn") {
                const {
                  getWarnCountByJID: _0xde2162,
                  ajouterUtilisateurAvecWarnCount: _0x1741af
                } = require("./bdd/warn");
                let _0x3e6541 = await _0xde2162(_0x9e4074);
                let _0x47b296 = conf.WARN_COUNT;
                if (_0x3e6541 >= _0x47b296) {
                  var _0x4d4c15 = "link detected , you will be remove because of reaching warn-limit";
                  await _0x41157d.sendMessage(_0x2a9ad4, {
                    'text': _0x4d4c15,
                    'mentions': [_0x9e4074]
                  }, {
                    'quoted': _0x3029c4
                  });
                  await _0x41157d.groupParticipantsUpdate(_0x2a9ad4, [_0x9e4074], 'remove');
                  await _0x41157d.sendMessage(_0x2a9ad4, {
                    'delete': _0x4a456e
                  });
                } else {
                  var _0x52ba28 = _0x47b296 - _0x3e6541;
                  var _0x439c45 = "Link detected , your warn_count was upgrade ;\n rest : " + _0x52ba28 + " ";
                  await _0x1741af(_0x9e4074);
                  await _0x41157d.sendMessage(_0x2a9ad4, {
                    'text': _0x439c45,
                    'mentions': [_0x9e4074]
                  }, {
                    'quoted': _0x3029c4
                  });
                  await _0x41157d.sendMessage(_0x2a9ad4, {
                    'delete': _0x4a456e
                  });
                }
              }
            }
          }
        }
      } catch (_0x41d8e8) {
        console.log("bdd err " + _0x41d8e8);
      }
      try {
        const _0x48ee82 = _0x3029c4.key?.['id']?.["startsWith"]("BAES") && _0x3029c4.key?.['id']?.['length'] === 0x10;
        const _0x322cf7 = _0x3029c4.key?.['id']?.["startsWith"]("BAE5") && _0x3029c4.key?.['id']?.["length"] === 0x10;
        if (_0x48ee82 || _0x322cf7) {
          if (_0x59690b === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0x1fc9d3 = await atbverifierEtatJid(_0x2a9ad4);
          if (!_0x1fc9d3) {
            return;
          }
          ;
          if (_0x303c9f || _0x9e4074 === _0x57354f) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x1f8659 = {
            'remoteJid': _0x2a9ad4,
            'fromMe': false,
            'id': _0x3029c4.key.id,
            'participant': _0x9e4074
          };
          var _0x394f96 = "bot detected, \n";
          var _0x5e05f3 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "Masker-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': '12345',
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x5e05f3.toFile("st1.webp");
          var _0x8b4429 = await atbrecupererActionJid(_0x2a9ad4);
          if (_0x8b4429 === "remove") {
            _0x394f96 += "message deleted \n @" + _0x9e4074.split('@')[0x0] + " removed from group.";
            await _0x41157d.sendMessage(_0x2a9ad4, {
              'sticker': fs.readFileSync('st1.webp')
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x41157d.sendMessage(_0x2a9ad4, {
              'text': _0x394f96,
              'mentions': [_0x9e4074]
            }, {
              'quoted': _0x3029c4
            });
            try {
              await _0x41157d.groupParticipantsUpdate(_0x2a9ad4, [_0x9e4074], "remove");
            } catch (_0x53ecac) {
              console.log("antibot ") + _0x53ecac;
            }
            await _0x41157d.sendMessage(_0x2a9ad4, {
              'delete': _0x1f8659
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x8b4429 === "delete") {
              _0x394f96 += "message delete \n @" + _0x9e4074.split('@')[0x0] + " Avoid sending link.";
              await _0x41157d.sendMessage(_0x2a9ad4, {
                'text': _0x394f96,
                'mentions': [_0x9e4074]
              }, {
                'quoted': _0x3029c4
              });
              await _0x41157d.sendMessage(_0x2a9ad4, {
                'delete': _0x1f8659
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x8b4429 === "warn") {
                const {
                  getWarnCountByJID: _0x2801e0,
                  ajouterUtilisateurAvecWarnCount: _0x2730c6
                } = require('./bdd/warn');
                let _0x5cc38b = await _0x2801e0(_0x9e4074);
                let _0x475601 = conf.WARN_COUNT;
                if (_0x5cc38b >= _0x475601) {
                  var _0x4d4c15 = "bot detected ;you will be remove because of reaching warn-limit";
                  await _0x41157d.sendMessage(_0x2a9ad4, {
                    'text': _0x4d4c15,
                    'mentions': [_0x9e4074]
                  }, {
                    'quoted': _0x3029c4
                  });
                  await _0x41157d.groupParticipantsUpdate(_0x2a9ad4, [_0x9e4074], "remove");
                  await _0x41157d.sendMessage(_0x2a9ad4, {
                    'delete': _0x1f8659
                  });
                } else {
                  var _0x52ba28 = _0x475601 - _0x5cc38b;
                  var _0x439c45 = "bot detected , your warn_count was upgrade ;\n rest : " + _0x52ba28 + " ";
                  await _0x2730c6(_0x9e4074);
                  await _0x41157d.sendMessage(_0x2a9ad4, {
                    'text': _0x439c45,
                    'mentions': [_0x9e4074]
                  }, {
                    'quoted': _0x3029c4
                  });
                  await _0x41157d.sendMessage(_0x2a9ad4, {
                    'delete': _0x1f8659
                  });
                }
              }
            }
          }
        }
      } catch (_0x3b039c) {
        console.log(".... " + _0x3b039c);
      }
      if (_0x59bdbe) {
        const _0x5b87d2 = evt.cm.find(_0x23a782 => _0x23a782.nomCom === _0x495f01);
        if (_0x5b87d2) {
          try {
            if (conf.MODE.toLocaleLowerCase() != 'yes' && !_0x468ada) {
              return;
            }
            if (!_0x468ada && _0x2a9ad4 === _0x9e4074 && conf.PM_PERMIT === "yes") {
              _0x1d2c8f("You don't have acces to commands here");
              return;
            }
            if (!_0x468ada && _0x30d651) {
              let _0x236cc = await isGroupBanned(_0x2a9ad4);
              if (_0x236cc) {
                return;
              }
            }
            if (!_0x303c9f && _0x30d651) {
              let _0x36d5da = await isGroupOnlyAdmin(_0x2a9ad4);
              if (_0x36d5da) {
                return;
              }
            }
            if (!_0x468ada) {
              let _0x505533 = await isUserBanned(_0x9e4074);
              if (_0x505533) {
                _0x1d2c8f("You are banned from bot commands");
                return;
              }
            }
            reagir(_0x2a9ad4, _0x41157d, _0x3029c4, _0x5b87d2.reaction);
            _0x5b87d2.fonction(_0x2a9ad4, _0x41157d, _0x24ce86);
          } catch (_0x3067f2) {
            console.log("😡😡 " + _0x3067f2);
            _0x41157d.sendMessage(_0x2a9ad4, {
              'text': "😡😡 " + _0x3067f2
            }, {
              'quoted': _0x3029c4
            });
          }
        }
      }
    });
    const {
      recupevents: _0x199d7b
    } = require('./bdd/welcome');
    _0x41157d.ev.on("group-participants.update", async _0x4bd693 => {
      console.log(_0x4bd693);
      let _0x27e9fc;
      try {
        _0x27e9fc = await _0x41157d.profilePictureUrl(_0x4bd693.id, 'image');
      } catch {
        _0x27e9fc = "https://telegra.ph/file/4cc2712eee93c105f6739.jpg";
      }
      try {
        const _0x5903aa = await _0x41157d.groupMetadata(_0x4bd693.id);
        if (_0x4bd693.action == "add" && (await _0x199d7b(_0x4bd693.id, "welcome")) == 'on') {
          let _0x991990 = "╔════◇◇◇═════╗\n║ bienvenue chère  nouvoux(s) membre(s)\n║ *Nouveaux(s) Membre(s) :*voici lien powered by Fredie Tech\",\n";
          let _0x5dc9ef = _0x4bd693.participants;
          for (let _0x3d2695 of _0x5dc9ef) {
            _0x991990 += "║ @" + _0x3d2695.split('@')[0x0] + "\n";
          }
          _0x991990 += "║\n╚════◇◇◇═════╝\n◇ *Descriptioon*   ◇\n\n" + _0x5903aa.desc;
          _0x41157d.sendMessage(_0x4bd693.id, {
            'image': {
              'url': _0x27e9fc
            },
            'caption': _0x991990,
            'mentions': _0x5dc9ef
          });
        } else {
          if (_0x4bd693.action == "remove" && (await _0x199d7b(_0x4bd693.id, "goodbye")) == 'on') {
            let _0x240e7b = "one or somes member(s) left group;\n";
            let _0xb60198 = _0x4bd693.participants;
            for (let _0x50cb60 of _0xb60198) {
              _0x240e7b += '@' + _0x50cb60.split('@')[0x0] + "\n";
            }
            _0x41157d.sendMessage(_0x4bd693.id, {
              'text': _0x240e7b,
              'mentions': _0xb60198
            });
          } else {
            if (_0x4bd693.action == "promote" && (await _0x199d7b(_0x4bd693.id, "antipromote")) == 'on') {
              if (_0x4bd693.author == _0x5903aa.owner || _0x4bd693.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || _0x4bd693.author == decodeJid(_0x41157d.user.id) || _0x4bd693.author == _0x4bd693.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x41157d.groupParticipantsUpdate(_0x4bd693.id, [_0x4bd693.author, _0x4bd693.participants[0x0]], 'demote');
              _0x41157d.sendMessage(_0x4bd693.id, {
                'text': '@' + _0x4bd693.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0x4bd693.author.split('@')[0x0] + " and @" + _0x4bd693.participants[0x0].split('@')[0x0] + " have been removed from administrative rights.",
                'mentions': [_0x4bd693.author, _0x4bd693.participants[0x0]]
              });
            } else {
              if (_0x4bd693.action == "demote" && (await _0x199d7b(_0x4bd693.id, "antidemote")) == 'on') {
                if (_0x4bd693.author == _0x5903aa.owner || _0x4bd693.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x4bd693.author == decodeJid(_0x41157d.user.id) || _0x4bd693.author == _0x4bd693.participants[0x0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x41157d.groupParticipantsUpdate(_0x4bd693.id, [_0x4bd693.author], 'demote');
                await _0x41157d.groupParticipantsUpdate(_0x4bd693.id, [_0x4bd693.participants[0x0]], 'promote');
                _0x41157d.sendMessage(_0x4bd693.id, {
                  'text': '@' + _0x4bd693.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0x4bd693.participants[0x0].split('@')[0x0] + ". Consequently, he has been stripped of administrative rights.",
                  'mentions': [_0x4bd693.author, _0x4bd693.participants[0x0]]
                });
              }
            }
          }
        }
      } catch (_0x5ec261) {
        console.error(_0x5ec261);
      }
    });
    async function _0x59ea9a() {
      const _0x239800 = require("node-cron");
      const {
        getCron: _0x59b7e4
      } = require("./bdd/cron");
      let _0x1cd89e = await _0x59b7e4();
      console.log(_0x1cd89e);
      if (_0x1cd89e.length > 0x0) {
        for (let _0x53f7e1 = 0x0; _0x53f7e1 < _0x1cd89e.length; _0x53f7e1++) {
          if (_0x1cd89e[_0x53f7e1].mute_at != null) {
            let _0x248f05 = _0x1cd89e[_0x53f7e1].mute_at.split(':');
            console.log("etablissement d'un automute pour " + _0x1cd89e[_0x53f7e1].group_id + " a " + _0x248f05[0x0] + " H " + _0x248f05[0x1]);
            _0x239800.schedule(_0x248f05[0x1] + " " + _0x248f05[0x0] + " * * *", async () => {
              await _0x41157d.groupSettingUpdate(_0x1cd89e[_0x53f7e1].group_id, 'announcement');
              _0x41157d.sendMessage(_0x1cd89e[_0x53f7e1].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Hello, it's time to close the group; sayonara."
              });
            }, {
              'timezone': "Africa/Abidjan"
            });
          }
          if (_0x1cd89e[_0x53f7e1].unmute_at != null) {
            let _0x1c1f3e = _0x1cd89e[_0x53f7e1].unmute_at.split(':');
            console.log("etablissement d'un autounmute pour " + _0x1c1f3e[0x0] + " H " + _0x1c1f3e[0x1] + " ");
            _0x239800.schedule(_0x1c1f3e[0x1] + " " + _0x1c1f3e[0x0] + " * * *", async () => {
              await _0x41157d.groupSettingUpdate(_0x1cd89e[_0x53f7e1].group_id, "not_announcement");
              _0x41157d.sendMessage(_0x1cd89e[_0x53f7e1].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Good morning; It's time to open the group."
              });
            }, {
              'timezone': "Africa/Abidjan"
            });
          }
        }
      } else {
        console.log("Les crons n'ont pas été activés");
      }
      return;
    }
    _0x41157d.ev.on("contacts.upsert", async _0x248ad8 => {
      const _0xe86521 = _0x5465bd => {
        for (const _0x58d2e4 of _0x5465bd) {
          if (store.contacts[_0x58d2e4.id]) {
            Object.assign(store.contacts[_0x58d2e4.id], _0x58d2e4);
          } else {
            store.contacts[_0x58d2e4.id] = _0x58d2e4;
          }
        }
        return;
      };
      _0xe86521(_0x248ad8);
    });
    _0x41157d.ev.on("connection.update", async _0x30e2e2 => {
      const {
        lastDisconnect: _0x9a18bb,
        connection: _0x4e0834
      } = _0x30e2e2;
      if (_0x4e0834 === 'connecting') {
        console.log("ℹ️ Connexion en cours...");
      } else {
        if (_0x4e0834 === "open") {
          console.log("✅ connexion reussie! ☺️");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log("------");
          0x0;
          await baileys_1.delay(0x12c);
          console.log("------------------/-----");
          console.log("le bot est en ligne 🕸\n\n");
          console.log("chargement des commandes ...\n");
          fs.readdirSync(__dirname + "/commandes").forEach(_0x30dfc8 => {
            if (path.extname(_0x30dfc8).toLowerCase() == '.js') {
              try {
                require(__dirname + "/commandes/" + _0x30dfc8);
                console.log(_0x30dfc8 + " installé ✔️");
              } catch (_0x4604c8) {
                console.log(_0x30dfc8 + " n'a pas pu être chargé pour les raisons suivantes : " + _0x4604c8);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0x2c3748;
          if (conf.MODE.toLocaleLowerCase() === "yes") {
            _0x2c3748 = "public";
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0x2c3748 = "private";
          } else {
            _0x2c3748 = "undefined";
          }
          console.log("chargement des commandes terminé ✅");
          await _0x59ea9a();
          if (conf.DP.toLowerCase() === 'yes') {
            let _0x41f172 = "╔════◇\n║X20 LUCKY_MD V5\n║    Prefix : [ " + prefixe + " ]\n║    Mode :" + _0x2c3748 + "\n║    Total Commandes : " + evt.cm.length + "︎\n╚══════════════════╝\n\n╔═════◇\n\npowered \" by FredieTech🤞 \"\n \nL'uck y md mult device, 2024 madein moon by Fredi ..\n  thans f'or choosing Lucky md V5\n\n╚══════════════════╝";
            await _0x41157d.sendMessage(_0x41157d.user.id, {
              'text': _0x41f172
            });
          }
        } else {
          if (_0x4e0834 == "close") {
            let _0x539617 = new boom_1.Boom(_0x9a18bb?.['error'])?.["output"]["statusCode"];
            if (_0x539617 === baileys_1.DisconnectReason.badSession) {
              console.log("Session id érronée veuillez rescanner le qr svp ...");
            } else {
              if (_0x539617 === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connexion fermée, reconnexion en cours ...");
                _0x571006();
              } else {
                if (_0x539617 === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connexion au serveur perdue 😞 ,,, reconnexion en cours ... ");
                  _0x571006();
                } else {
                  if (_0x539617 === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                    console.log("connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!");
                  } else {
                    if (_0x539617 === baileys_1.DisconnectReason.loggedOut) {
                      console.log("vous êtes déconnecté,,, veuillez rescanner le code qr svp");
                    } else {
                      if (_0x539617 === baileys_1.DisconnectReason.restartRequired) {
                        console.log("redémarrage en cours ▶️");
                        _0x571006();
                      } else {
                        console.log("redemarrage sur le coup de l'erreur  ", _0x539617);
                        const {
                          exec: _0x2fb97d
                        } = require("child_process");
                        _0x2fb97d("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x4e0834);
            _0x571006();
          }
        }
      }
    });
    _0x41157d.ev.on("creds.update", _0x10ab0d);
    _0x41157d.downloadAndSaveMediaMessage = async (_0x2ccba4, _0x588a5a = '', _0x1e3214 = true) => {
      let _0x3580b0 = _0x2ccba4.msg ? _0x2ccba4.msg : _0x2ccba4;
      let _0x3e2137 = (_0x2ccba4.msg || _0x2ccba4).mimetype || '';
      let _0x4eb9a7 = _0x2ccba4.mtype ? _0x2ccba4.mtype.replace(/Message/gi, '') : _0x3e2137.split('/')[0x0];
      0x0;
      const _0x52cf28 = await baileys_1.downloadContentFromMessage(_0x3580b0, _0x4eb9a7);
      let _0x42605a = Buffer.from([]);
      for await (const _0xce9b0d of _0x52cf28) {
        _0x42605a = Buffer.concat([_0x42605a, _0xce9b0d]);
      }
      let _0x362a72 = await FileType.fromBuffer(_0x42605a);
      let _0x2def4e = './' + _0x588a5a + '.' + _0x362a72.ext;
      await fs.writeFileSync(_0x2def4e, _0x42605a);
      return _0x2def4e;
    };
    _0x41157d.awaitForMessage = async (_0x185249 = {}) => {
      return new Promise((_0x1e8444, _0x5da5dc) => {
        if (typeof _0x185249 !== 'object') {
          _0x5da5dc(new Error("Options must be an object"));
        }
        if (typeof _0x185249.sender !== "string") {
          _0x5da5dc(new Error("Sender must be a string"));
        }
        if (typeof _0x185249.chatJid !== "string") {
          _0x5da5dc(new Error("ChatJid must be a string"));
        }
        if (_0x185249.timeout && typeof _0x185249.timeout !== "number") {
          _0x5da5dc(new Error("Timeout must be a number"));
        }
        if (_0x185249.filter && typeof _0x185249.filter !== "function") {
          _0x5da5dc(new Error("Filter must be a function"));
        }
        const _0x5efee0 = _0x185249?.['timeout'] || undefined;
        const _0x5e47eb = _0x185249?.["filter"] || (() => true);
        let _0x289ff3 = undefined;
        let _0x5ebf47 = _0x513a40 => {
          let {
            type: _0x30db9b,
            messages: _0x3ff3bd
          } = _0x513a40;
          if (_0x30db9b == "notify") {
            for (let _0x39a7dd of _0x3ff3bd) {
              const _0x26564f = _0x39a7dd.key.fromMe;
              const _0x32ec52 = _0x39a7dd.key.remoteJid;
              const _0x4cd95a = _0x32ec52.endsWith("@g.us");
              const _0x6c9e59 = _0x32ec52 == 'status@broadcast';
              const _0x2a5f00 = _0x26564f ? _0x41157d.user.id.replace(/:.*@/g, '@') : _0x4cd95a || _0x6c9e59 ? _0x39a7dd.key.participant.replace(/:.*@/g, '@') : _0x32ec52;
              if (_0x2a5f00 == _0x185249.sender && _0x32ec52 == _0x185249.chatJid && _0x5e47eb(_0x39a7dd)) {
                _0x41157d.ev.off("messages.upsert", _0x5ebf47);
                clearTimeout(_0x289ff3);
                _0x1e8444(_0x39a7dd);
              }
            }
          }
        };
        _0x41157d.ev.on("messages.upsert", _0x5ebf47);
        if (_0x5efee0) {
          _0x289ff3 = setTimeout(() => {
            _0x41157d.ev.off("messages.upsert", _0x5ebf47);
            _0x5da5dc(new Error('Timeout'));
          }, _0x5efee0);
        }
      });
    };
    return _0x41157d;
  }
  let _0x973e56 = require.resolve(__filename);
  fs.watchFile(_0x973e56, () => {
    fs.unwatchFile(_0x973e56);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x973e56];
    require(_0x973e56);
  });
  _0x571006();
}, 0x1388);
