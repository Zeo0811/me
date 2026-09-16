# Zeo · In the Current

个人飞钓网站：已解锁鱼种、Wish list 与个人介绍。源自本人直接确认的 9 种名单与小红书记录。

## 内容维护

- `content/journal.ts`：已解锁鱼种与本人主页链接。
- `app/page.tsx`：Wish list 与介绍文字。
- `app/globals.css`：响应式排版和 CSS 3D 层次。
- `public/images/zeo-river.webp`：用户本人公开帖中的照片；原帖摄影署名“包哥爱玩野路子”，页面保留署名与原帖链接。

未加入后台编辑、上传、登录业务或云数据库；内容目前由项目文件维护。默认部署为仅本人可见。没有导入私密帖子或聊天原始内容。

本地：npm run dev。发布构建：npm run build。对减少动态效果设置提供降级。


## 鱼获记录维护

编辑 `content/journal.ts` 的 date、place、photos、caption、source 和 locationBasis。照片放在 public/images/catches/，photos 使用 /images/catches/ 开头的站内路径。空字符串与空照片数组会显示待补充。日期默认按笔记时间标注，换成实际鱼获日期时也应同步调整字段标签和来源说明。当前没有网页内保存编辑功能。
