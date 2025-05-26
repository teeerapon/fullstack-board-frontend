# 📝 Blog Post Platform

ระบบจัดการโพสต์และคอมเมนต์ พร้อมระบบล็อกอิน และ UI ที่ตอบสนองได้ดีทั้งบน Desktop และ Mobile

---

## 🚀 เริ่มต้นใช้งาน

### 1. Clone โปรเจกต์

```bash
# 1. Clone โพรเจ็ก
$ git clone https://github.com/your-username/your-repo.git
$ cd your-repo
```

### 2. ติดตั้ง dependencies

```bash
$ npm install
$ npm install lucide-react sweetalert2 axios
```

### 3. Create env
```bash
$ touch .env.local
# เพิ่มค่าต่อไปนี้:
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 4. Run
```bash
$ npm run dev
```

> ใช้งานผ่าน http://localhost:3000

---

## ✨ Features

### 📝 Blog Post Management (`features/post/`)

ระบบจัดการโพสต์และคอมเมนต์แบบแยกส่วนชัดเจน:

#### 📦 Components

* **`PostCard.tsx`**

  * แสดงโพสต์แบบการ์ด: ชื่อโพสต์, ผู้เขียน, จำนวนคอมเมนต์
  * มีระบบค้นหาชื่อโพสต์ และกรองหมวดหลายด้วย Dropdown
  * สามารถแสดง/เพิ่มคอมเมนต์ใน Desktop ได้ทันที

* **`CreatePostDialog.tsx`**

  * Dialog สร้างโพสต์ใหม่ (Login ก่อนถึงใช้ได้)

* **`EditPostDialog.tsx`**

  * Dialog แก้ไขโพสต์ (Login และเป็นเจ้าของโพสต์)

* **`CommentItem.tsx`**

  * แสดงคอมเมนต์ มี Edit / Delete สำหรับเจ้าของคอมเมนต์

* **`CommentEditor.tsx`**

  * กล่อง Edit Comment พร้อม textarea + Save/Cancel (Login ก่อนถึงใช้ได้)

* **`CommentDialog.tsx`**

  * Dialog เพิ่มคอมเมนต์ใน Mobile (Login ก่อนถึง)

---

### 📁 Models (`models/`)

* **`Post.ts`**

  ```ts
  id, title, content, category, avatar, comments, author, createdAt, commentCount
  ```

* **`Comment.ts`**

  ```ts
  id, post_id, content, avatar, author, createdAt
  ```

* **`Category.ts`**

  ```ts
  id, title
  ```

---

### ⚙️ Services (`services/`)

* **`postApi.ts`**

  * `getAllPosts()` : ดึงโพสต์ทั้งหมด
  * `getPostId()` : โพสต์ของเรา

* **`commentApi.ts`**

  * `getCommentsApi()` : ดึงคอมเมนต์ทั้งหมด
  * `getCommentsByPostId()` : แสดงคอมเมนต์เกี่ยวโพสต์

* **`communicationApi.ts`**

  * (ฟีเจอร์เสริมหรือสื่อสาร)

---

### 💡 Usecases (`usecases/`)

* **`GetAllComments.ts`**

  * ดึงคอมเมนต์ทั้งหมด

* **`GetAllCommunication.ts`**

  * ดึงการสื่อสารพิเศษีสื่อสาร

---

### 🔐 Authentication

* **`context/AuthContext.tsx`**

  * จัดการสถานะผู้ใช้: Login/Logout, เช็คสิทธิ์

---

### 🧱 Layout

* **`LayoutWithNav.tsx`**

  * Layout หลัก มี Navigation ด้านบน

* **`Sidebar.tsx`** & **`StaticSidebar.tsx`**

  * เมนูด้านข้าง Mobile และ Desktop

* **`SignOutButton.tsx`**

  * ปุ่มออกจากระบบ

---

### 🧠 Lib (`lib/`)

* **`hooks/useAuthRedirect.ts`**

  * redirect โดยอัตโนมัติ Login ไม่เข้า

* **`axios.ts`**

  * ตั้งค่า base URL และ config Axios ทั่วหมด

---

## 📊 Third-party Libraries

* [`lucide-react`](https://lucide.dev/) - ไอคอน
* [`sweetalert2`](https://sweetalert2.github.io/) - popup แจ้งเตือน / ยืนยัน
* [`axios`](https://axios-http.com/) - เรียก backend API

---

## สร้างด้วย Next.js + TailwindCSS + Context API**

## 🧑‍💻 ผู้พัฒนา

พัฒนาโดย Teerapon Suksangpleng 
สามารถนำไปใช้งาน ปรับแต่ง และขยายต่อได้ตามต้องการ 🎉
