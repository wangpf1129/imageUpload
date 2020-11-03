<template>
  <div
    id="upload"
    @dragenter="OnDragEnter"
    @dragleave="OnDragLeave"
    @dragover.prevent
    @drop="onDrop"
    :class="{ dragging: isDragging }"
  >
    <div class="upload-control" v-show="images.length">
      <label for="file">选择图片</label>
      <button @click="upload">Upload</button>
    </div>

    <div v-show="!images.length">
      <i class="fa fa-cloud-upload"></i>
      <p>拖拽你的图片到这里</p>
      <div>或者</div>
      <div class="file-input">
        <label for="file">选择图片</label>
        <input type="file" id="file" multiple @change="onInputChange" />
      </div>
    </div>
    <div class="images-preview" v-show="images.length">
      <div class="img-wrapper" v-for="(image, index) in images" :key="index">
        <img :src="image" :alt="`Image Uploader ${index}`" />
        <div class="details">
          <span class="name">{{ files[index].name }}</span>
          <span class="size">{{ files[index].size }}KB</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 样式的改变
      isDragging: false,
      // 计算图片拖拽到该元素的数量
      dragCount: 0,
      images: [],
      files: [],
    };
  },
  methods: {
    onInputChange(e) {
      // console.log(e)
      console.log(this.images);
      console.log(this.files);

      const files = e.target.files;
      Array.from(files).forEach((file) => this.addImage(file));
    },
    //  拖拽进入 drop 元素内时发生
    OnDragEnter(e) {
      // 阻止浏览器的默认操作
      e.preventDefault();
      // 当 将图片拖拽到该元素时就把样式改变
      this.isDragging = true;

      this.dragCount++;
    },
    //  拖拽离开 drop 元素内时发生
    OnDragLeave(e) {
      e.preventDefault();

      this.dragCount--;
      // 如果 图片拖拽到该元素的数量没有 则将样式恢复到原样
      if (this.dragCount <= 0) this.isDragging = false;
    },
    onDrop(e) {
      e.preventDefault();
      // 阻止冒泡事件
      e.stopPropagation();

      this.isDragging = false;

      // 获取该文件（图片）
      const files = e.dataTransfer.files;
      // console.log(files)

      // Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。
      Array.from(files).forEach((file) => this.addImage(file));
    },
    addImage(file) {
      // match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配
      // 检索该文件类型是不是属于 图片 类型
      if (!file.type.match("image.*")) {
        alert(`${file.name} 不是图片`);
        return;
      }
      // 如果是图片类型 就将文件push 到files变量中
      this.files.push(file);

      // 创建一个Image对象：var a=new Image(); 定义Image对象的src: a.src=”xxx.gif”;
      // 这样做就相当于给浏览器缓存了一张图片。
      const img = new Image(),
        // FileReader接口提供了读取文件的方法和包含读取结果的事件模型。
        reader = new FileReader();

      // 文件读取成功完成时触发
      reader.onload = (e) => {
        console.log(e);
        this.images.push(e.target.result);
      };
      // 将文件读取为 DataURL
      reader.readAsDataURL(file);
    },
    upload() {
      const fd = new FormData();
      this.files.forEach((file) => {
        fd.append("images[]", file, file.name);
      });
      axios.post("/upload", fd).then(res=>{
          alert("图片上传成功")
          this.images=[]
          this.files=[]
      })
    },
  },
};
</script>

<style lang="scss" scoped>
#upload {
  position: relative;
  background-color: #2196f3;
  text-align: center;
  color: #fff;
  padding: 30px 15px;
  border: 3px dashed #fff;
  border-radius: 10px;
  margin: 20px;

  .upload-control {
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
    background-color: #fff;
    text-align: right;
    padding: 10px;
    margin-top: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    label {
      margin-right: 10px;
    }
    label,
    button {
      border: none;
      outline: none;
      background-color: #2196f3;
      color: #fff;
      padding: 2px 20px;
      border-radius: 10px;
      cursor: pointer;
    }
  }

  &.dragging {
    color: #2196f3;
    background-color: #fff;
    border: 3px dashed #2196f3;

    .file-input label {
      color: #fff;
      background-color: #2196f3;
    }
  }

  i {
    font-size: 68px;
    cursor: pointer;
  }

  & > div {
    margin-top: 20px;
  }

  .file-input {
    input {
      display: none;
    }

    label {
      background-color: #fff;
      color: #2196f3;
      padding: 10px 45px;
      border-radius: 8px;
      cursor: pointer;
    }
  }

  .images-preview {
    display: flex;
    /*支持换行*/
    flex-wrap: wrap;
    /*align-items: center;*/
    /*justify-content: space-evenly;*/
    margin-top: 20px;
    background-color: #2196f3;
    padding: 20px;

    .img-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 160px;
      height: 160px;
      margin: 5px;
      background-color: #fff;
      box-shadow: 2px 2px 8px #3e3737;

      img {
        max-height: 105px;
        margin: 0 auto;
      }

      .details {
        display: flex;
        flex-direction: column;
        align-items: self-start;
        padding: 5px;
        font-size: 12px;
        color: #000;

        .name {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          height: 18px;
        }
      }
    }
  }
}
</style>>

