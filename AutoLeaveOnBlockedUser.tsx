import { Vencord } from "@vencord/api";
import { React } from "@vendord/webpack";

const BLOCKED_USER_IDS = [
  "769460293804752967",
  "1249845630499819527",
];

export default class AutoLeaveOnBlockedUser extends Vencord.Plugin {
  private disconnect = Vencord.Webpack.findByProps("disconnect").disconnect;
  private getCurrentUser = Vencord.Webpack.findByProps("getCurrentUser").getCurrentUser;
  private getVoiceChannelId = Vencord.Webpack.findByProps("getVoiceChannelId").getVoiceChannelId;
  private getVoiceStates = Vencord.Webpack.findByProps("getVoiceStates").getVoiceStates;

  start() {
    Vencord.Api.on("VOICE_STATE_UPDATE", this.checkVoice);
  }

  stop() {
    Vencord.Api.off("VOICE_STATE_UPDATE", this.checkVoice);
  }

  checkVoice = () => {
    const myChannelId = this.getVoiceChannelId();
    if (!myChannelId) return;

    const myUserId = this.getCurrentUser().id;
    const voiceStates = this.getVoiceStates();

    for (const uid of BLOCKED_USER_IDS) {
      if (uid === myUserId) continue;
      const state = voiceStates[uid];
      if (state?.channelId === myChannelId) {
        this.disconnect();
        break;
      }
    }
  };
}
