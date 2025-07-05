# 万校互联教练系统

一个现代化的家教学生信息管理和上课时间安排系统，帮助教练更好地管理学生信息、安排课程、处理试学流程和记录伴学反馈。

## 功能特性

### 🎓 学生管理
- 学生基本信息管理（姓名、年级、科目、联系方式等）
- 学生状态跟踪（正式学员、试学中、已完成）
- 搜索和筛选功能
- 学生详情查看

### 📅 课程安排
- 课程时间安排和管理
- 课程状态跟踪（已安排、已完成、已取消）
- 课程备注和说明
- 课程历史记录

### 🎯 试学管理
- 试学课程安排
- 试学反馈记录
- 试学结果管理（接受、拒绝、待决定）
- 试学状态跟踪

### 💬 伴学反馈
- 学习情况记录
- 学习进度跟踪
- 下一步计划制定
- 评分系统

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI组件**: React + TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **状态管理**: React Hooks

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
万校互联教练/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── package.json           # 项目配置
├── tailwind.config.js     # Tailwind配置
├── tsconfig.json          # TypeScript配置
└── README.md             # 项目说明
```

## 主要功能模块

### 1. 学生管理模块
- 添加新学生
- 编辑学生信息
- 查看学生详情
- 学生状态管理

### 2. 课程安排模块
- 创建课程安排
- 课程时间管理
- 课程状态更新
- 课程历史查看

### 3. 试学管理模块
- 安排试学课程
- 记录试学反馈
- 试学结果处理
- 试学状态跟踪

### 4. 伴学反馈模块
- 记录学习情况
- 跟踪学习进度
- 制定学习计划
- 评分和评价

## 数据模型

### Student (学生)
```typescript
interface Student {
  id: string
  name: string
  grade: string
  subject: string
  phone: string
  parentPhone: string
  address: string
  status: 'active' | 'trial' | 'completed'
  joinDate: string
}
```

### ClassSchedule (课程安排)
```typescript
interface ClassSchedule {
  id: string
  studentId: string
  studentName: string
  subject: string
  date: string
  time: string
  duration: number
  status: 'scheduled' | 'completed' | 'cancelled'
  notes: string
}
```

### TrialSession (试学)
```typescript
interface TrialSession {
  id: string
  studentId: string
  studentName: string
  subject: string
  date: string
  time: string
  duration: number
  status: 'pending' | 'completed' | 'cancelled'
  feedback: string
  result: 'accepted' | 'rejected' | 'pending'
}
```

### Feedback (反馈)
```typescript
interface Feedback {
  id: string
  studentId: string
  studentName: string
  date: string
  content: string
  progress: string
  nextSteps: string
  rating: number
}
```

## 开发计划

### 第一阶段 ✅
- [x] 基础项目结构搭建
- [x] 主要页面布局
- [x] 基础功能实现
- [x] 响应式设计

### 第二阶段 🚧
- [ ] 数据持久化
- [ ] 用户认证
- [ ] 数据导入导出
- [ ] 高级搜索功能

### 第三阶段 📋
- [ ] 数据可视化
- [ ] 报表生成
- [ ] 移动端适配
- [ ] 性能优化

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 项目 Issues: [GitHub Issues](https://github.com/your-username/万校互联教练/issues)
- 邮箱: your-email@example.com

---

**万校互联教练系统** - 让家教管理更简单、更高效！ 