<template>
  <div class="demo-block ddddd" :class="[blockClass]">
    <!-- 演示区 -->
    <div class="demo-content">
      111
      <component :ref="componentName" :is="componentName" v-if="componentName" v-bind="$attrs" />
      <slot name="source"></slot>
    </div>
    <!-- 代码区 -->
    <div class="code-content" ref="code-content">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="" name="1">
          <template #title>
            <div class="code-control">
              <ElTooltip content="复制代码" :show-arrow="false">
                <ElIcon :size="14" class="op-btn" @click.stop="copyCode">
                  <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1em" height="1em"
                    data-v-65a7fb6c="">
                    <path fill="currentColor"
                      d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z">
                    </path>
                  </svg>
                </ElIcon>
              </ElTooltip>

              <ElTooltip content="查看源代码" :show-arrow="false">
                <ElIcon :size="16" class="op-btn">
                  <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1em" height="1em"
                    data-v-65a7fb6c="">
                    <path fill="currentColor"
                      d="m23 12l-7.071 7.071l-1.414-1.414L20.172 12l-5.657-5.657l1.414-1.414L23 12zM3.828 12l5.657 5.657l-1.414 1.414L1 12l7.071-7.071l1.414 1.414L3.828 12z">
                    </path>
                  </svg>
                </ElIcon>
              </ElTooltip>
            </div>
          </template>
          <div>
            <div class="description" v-html="decodeDesc" v-if="decodeDesc"></div>
            <div class="code-content" v-html="decoded"></div>

          </div>
        </el-collapse-item>
      </el-collapse>

    </div>
    <div class="code-hide" v-show="activeName == '1'" @click="activeName = '0'">
      <el-icon>
        <CaretTop />
      </el-icon>
      隐藏
    </div>
  </div>
</template>

<script setup>
import copy from './utils/copy'
import { ElMessage } from 'element-plus'
import { isClient, useClipboard, useToggle } from '@vueuse/core'
import { ref, computed } from 'vue';
let activeName = ref('0')

let props = defineProps({
  description: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  sourceFile: {
    type: String,
    required: true,
  },
  rawSource: {
    type: String,
    required: true,
  },
  componentName: {
    type: String,
    required: true,
  },
  options: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

let decoded = computed(() => {
  return decodeURIComponent(props.source)
})
let decodeDesc = computed(() => {
  return decodeURIComponent(props.description)
})
let blockClass = computed(() => {
  return 'demo-select'
  // return `demo-${this.$route.path.split("/").pop().replace('.html', '')}`;
})

const copyCode = async () => {
  try {
    copy(decodeURIComponent(props.rawSource))
    ElMessage.success('复制成功')
  } catch (e) {
    ElMessage.error(e.message)
  }
}
</script>

<style scoped lang="scss">
:deep(.el-collapse-item .el-collapse-item__arrow) {
  display: none;
}

:deep(.el-collapse-item__content) {
  padding-bottom: 0;
}

:deep(.el-collapse-item__header) {
  height: auto;
}

.code-control {
  flex: 1;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  box-sizing: border-box;


  .op-btn {
    margin: 0 0.5rem;
    cursor: pointer;
    color: var(--c-text-quote);
    transition: 0.2s;
    font-weight: bold;

    &:hover {
      color: var(--c-text);
    }
  }
}

.code-hide {
  cursor: pointer;
  color: var(--c-text-quote);
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--c-border);
  box-sizing: border-box;
  background-color: #fff;
  height: 44px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  margin-top: -1px;
  position: sticky;
  bottom: 0;
  z-index: 10;
  font-size: 14px;

  &:hover {
    color: var(--c-text);
  }
}

.demo-block {
  border: solid 1px var(--c-border);
  border-radius: 3px;
  transition: 0.2s;
  margin-top: 15px;
  margin-bottom: 15px;

  .demo-content {
    padding: 24px;
  }

  .code-content {
    background-color: #f5f7fa;
    border: solid 1px var(--c-border);
    border-top: 0;
    margin: -1px;
    border-radius: 3px;
    overflow: hidden;
    height: auto;
    transition: height 0.2s;
  }

  .description {
    padding: 0px 20px;
    box-sizing: border-box;
    border: solid 1px var(--c-border);
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: var(--c-text-light);
    word-break: break-word;
    margin: 10px;
    background-color: var(--c-bg);
  }
}
</style>
<style lang="scss">
.theme-default-content pre {
  margin: 0;
}

.demo-block .code-content .code-content pre code {
  color: var(--c-text);

}

.token.tag {
  color: #3182bd;
}

.token.keyword {
  color: #c792ea;
}

.dark .toten.tag {
  color: var(--c-danger-bg);
}
</style>