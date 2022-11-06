import { defineStore } from 'pinia'
import store from 'store2'
import _ from 'lodash'
import { ElNotification } from 'element-plus'

const useWebsiteStore = defineStore('websiteStore', {
  state () {
    return {
      websites: []
    }
  },
  actions: {
    add (item) {
      if (_.find(this.websites, { url: item.url })) {
        //electron的原生信息提示
        //myApi.alert(`${item.url}已经存在`)

        ElNotification({
          title: '提示',
          message: `${item.url}已经存在`,
          type: 'warning',
        })
      } else {
        this.websites.unshift(item)
        store('websites', this.websites)
      }

    },
    init () {
      this.websites = store.get('websites')
    },

    deleteItem (url) {
      this.websites.map((m, index) => {
        if (m.url === url) {
          this.websites.splice(index, 1)
        }
      })
      store('websites', this.websites)
    }
  },
  getters: {
    find () {
      return (keywords) => {
        if (keywords === '') {
          return this.websites
        } else {
          return this.websites.filter((item) => {
            return item.title.toLowerCase().indexOf(keywords.toLowerCase()) !== -1
          })
        }

      }
    }
  }
})

export default useWebsiteStore