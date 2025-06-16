/* 全局样式重置 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 设置基础字体大小 */
html {
    font-size: 16px; /* 通常以16px为基准 */
}

body {
    font-family: 'Arial', sans-serif; /* 设置字体 */
    line-height: 1.6; /* 设置行高 */
    color: #333; /* 设置字体颜色 */
}

/* 响应式图片 */
img {
    max-width: 100%;
    height: auto;
}

/* 容器宽度限制，以适应不同屏幕 */
.container {
    width: 100%;
    max-width: 1200px; /* 限制最大宽度 */
    margin: 0 auto; /* 水平居中 */
    padding: 0 15px; /* 两边留出内边距 */
}

/* 响应式栅格系统示例 */
.row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
}

.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12 {
    padding: 0 15px;
    flex: 1;
}

/* 媒体查询，根据不同屏幕尺寸调整样式 */
@media (max-width: 768px) {
    html {
        font-size: 14px; /* 在小屏幕上减小字体大小 */
    }

    .container {
        padding: 0 10px; /* 在小屏幕上减小内边距 */
    }

    .row {
        flex-direction: column; /* 在小屏幕上将布局改为垂直排列 */
    }
}
/* 全局样式重置 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 设置基础字体大小 */
html {
    font-size: 16px; /* 通常以16px为基准 */
}

body {
    font-family: 'Arial', sans-serif; /* 设置字体 */
    line-height: 1.6; /* 设置行高 */
    color: #333; /* 设置字体颜色 */
}

/* 响应式图片 */
img {
    max-width: 100%;
    height: auto;
}

/* 容器宽度限制，以适应不同屏幕 */
.container {
    width: 100%;
    max-width: 1200px; /* 限制最大宽度 */
    margin: 0 auto; /* 水平居中 */
    padding: 0 15px; /* 两边留出内边距 */
}

/* 响应式栅格系统示例 */
.row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
}

.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12 {
    padding: 0 15px;
    flex: 1;
}

/* 媒体查询，根据不同屏幕尺寸调整样式 */
@media (max-width: 768px) {
    html {
        font-size: 14px; /* 在小屏幕上减小字体大小 */
    }

    .container {
        padding: 0 10px; /* 在小屏幕上减小内边距 */
    }

    .row {
        flex-direction: column; /* 在小屏幕上将布局改为垂直排列 */
    }
}
# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
