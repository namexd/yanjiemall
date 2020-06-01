<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.child,item) && (!onlyOneChild.child||onlyOneChild.noShowingChildren)">
      <app-link v-if="onlyOneChild.menu_url" :to="resolvePath(onlyOneChild.menu_url)">
        <el-menu-item :index="resolvePath(onlyOneChild.menu_url)" :class="{'submenu-title-noDropdown':!isNest}">
          <item icon="" :title="onlyOneChild.menu_name"  />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.menu_url)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.menu_name" icon="" :title="item.menu_name" />
      </template>
      <sidebar-item
        v-for="child in item.child"
        :key="child.id"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.menu_url)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (!item.is_menu) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
