<template>
  <el-row style="width:100%;height:100%;overflow-x:hidden">
    <a-list :grid="{ gutter: 16, column: 4 }" :dataSource="allplayers">
      <a-list-item slot="renderItem" slot-scope="item ">
        <a-card :title="item.title">
          <a-button @click="watchPlay(item.playerMachineId)" type="link">观看直播</a-button>
        </a-card>
      </a-list-item>
    </a-list>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VuexStore from '@/store'
import websocketChat, { websocketMsgTemp, msgType } from '@/utils/websocketChat'
import { AxiosResponse } from 'axios'
import { RouterHelper, routePaths } from '@/router'
import { getAllPlays } from '@/api/user'
@Component
export default class videoPlay extends Vue {
  private allplayers: any[] = []

  mounted() {
    getAllPlays().then((players) => {
      window.console.log(players)
      players.forEach((o) => {
        this.allplayers.push({ title: o.playId, playerMachineId: o.playerMachineId })
      })
    })
  }

  private watchPlay(playerMachineId: string) {
    window.console.log('观看直播:', playerMachineId)
    RouterHelper.pushRouter(routePaths.joinVideoPlay, { playerMachineId: playerMachineId }, this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
