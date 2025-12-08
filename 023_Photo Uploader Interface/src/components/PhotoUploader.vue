<template>
  <div class="photo-uploader">
    <h1 class="title">Photo Uploader</h1>
    <p class="subtitle">Drag & drop or click to upload your images</p>
    
    <!-- Upload Area -->
    <div 
      ref="dropZone"
      class="upload-area"
      :class="{ 'is-dragover': isDragover, 'is-uploading': isUploading }"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <div class="upload-content">
        <div class="upload-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 18V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 v-if="!isDragover">Drop your photos here</h3>
        <h3 v-else>Release to upload</h3>
        <p>or <span class="browse-link">browse</span> to choose files</p>
        <p class="formats">Supported formats: JPG, PNG, GIF, WebP (Max 5MB each)</p>
      </div>
      <input 
        ref="fileInput"
        type="file" 
        accept="image/*" 
        multiple 
        @change="handleFileSelect"
        class="file-input"
      />
      
      <!-- Upload Progress -->
      <div v-if="isUploading" class="upload-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
        </div>
        <p class="progress-text">Uploading... {{ uploadProgress }}%</p>
      </div>
    </div>
    
    <!-- Uploaded Photos -->
    <div v-if="uploadedPhotos.length > 0" class="uploaded-photos">
      <h2 class="section-title">Uploaded Photos ({{ uploadedPhotos.length }})</h2>
      <div class="photos-grid">
        <div 
          v-for="(photo, index) in uploadedPhotos" 
          :key="photo.id"
          class="photo-item"
          @mouseenter="animatePhotoIn(index)"
          @mouseleave="animatePhotoOut(index)"
        >
          <div class="photo-wrapper">
            <img :src="photo.url" :alt="photo.name" class="photo-img" />
            <div class="photo-overlay">
              <button class="delete-btn" @click.stop="deletePhoto(index)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="photo-info">
                <span class="photo-name">{{ photo.name }}</span>
                <span class="photo-size">{{ formatFileSize(photo.size) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Clear All Button -->
      <div class="actions">
        <button class="clear-btn" @click="clearAllPhotos" v-if="uploadedPhotos.length > 0">
          Clear All Photos
        </button>
      </div>
    </div>
    
    <!-- Status Messages -->
    <div v-if="statusMessage" class="status-message" :class="statusType">
      {{ statusMessage }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

export default {
  name: 'PhotoUploader',
  setup() {
    const dropZone = ref(null);
    const fileInput = ref(null);
    const isDragover = ref(false);
    const isUploading = ref(false);
    const uploadProgress = ref(0);
    const uploadedPhotos = ref([]);
    const statusMessage = ref('');
    const statusType = ref('');

    // Mock photo data for initial display (optional)
    const mockPhotos = [
      { id: 1, name: 'nature.jpg', size: 2048000, url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
      { id: 2, name: 'cityscape.png', size: 1543000, url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
      { id: 3, name: 'portrait.gif', size: 3200000, url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
    ];

    // Initialize with mock data
    onMounted(() => {
      // You can uncomment this line to start with some example photos
      // uploadedPhotos.value = mockPhotos;
      
      // Initial animation for the upload area
      if (dropZone.value) {
        gsap.from(dropZone.value, {
          duration: 0.8,
          y: 20,
          opacity: 0,
          ease: "back.out(1.7)"
        });
      }
    });

    const handleDragOver = (event) => {
      isDragover.value = true;
      event.dataTransfer.dropEffect = 'copy';
    };

    const handleDragLeave = () => {
      isDragover.value = false;
    };

    const handleDrop = (event) => {
      isDragover.value = false;
      const files = event.dataTransfer.files;
      processFiles(files);
    };

    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const handleFileSelect = (event) => {
      const files = event.target.files;
      processFiles(files);
      // Reset file input to allow selecting the same file again
      event.target.value = '';
    };

    const processFiles = (files) => {
      if (!files || files.length === 0) return;
      
      const validFiles = [];
      const invalidFiles = [];
      
      // Validate each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
          invalidFiles.push({ name: file.name, reason: 'Not an image file' });
          continue;
        }
        
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          invalidFiles.push({ name: file.name, reason: 'File exceeds 5MB limit' });
          continue;
        }
        
        validFiles.push(file);
      }
      
      // Show error messages for invalid files
      if (invalidFiles.length > 0) {
        showStatus(`Some files were rejected: ${invalidFiles.map(f => `${f.name} (${f.reason})`).join(', ')}`, 'error');
      }
      
      if (validFiles.length > 0) {
        uploadFiles(validFiles);
      }
    };

    const uploadFiles = async (files) => {
      isUploading.value = true;
      uploadProgress.value = 0;
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        uploadProgress.value += 10;
        if (uploadProgress.value >= 100) {
          clearInterval(progressInterval);
          completeUpload(files);
        }
      }, 100);
    };

    const completeUpload = (files) => {
      // Create photo objects from uploaded files
      const newPhotos = Array.from(files).map((file, index) => {
        const url = URL.createObjectURL(file);
        return {
          id: Date.now() + index,
          name: file.name,
          size: file.size,
          url: url,
          file: file
        };
      });
      
      // Add new photos to the list
      uploadedPhotos.value = [...newPhotos, ...uploadedPhotos.value];
      
      // Reset upload state
      setTimeout(() => {
        isUploading.value = false;
        uploadProgress.value = 0;
        showStatus(`Successfully uploaded ${files.length} photo(s)`, 'success');
        
        // Animate new photos
        animateNewPhotos();
      }, 300);
    };

    const animateNewPhotos = () => {
      // Animate newly added photos
      gsap.from('.photo-item', {
        duration: 0.6,
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(1.2)"
      });
    };

    const animatePhotoIn = (index) => {
      gsap.to(`.photo-item:nth-child(${index + 1})`, {
        duration: 0.3,
        scale: 1.05,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        ease: "power2.out"
      });
    };

    const animatePhotoOut = (index) => {
      gsap.to(`.photo-item:nth-child(${index + 1})`, {
        duration: 0.3,
        scale: 1,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        ease: "power2.out"
      });
    };

    const deletePhoto = (index) => {
      // Animate photo removal
      const photoElement = document.querySelector(`.photo-item:nth-child(${index + 1})`);
      if (photoElement) {
        gsap.to(photoElement, {
          duration: 0.3,
          opacity: 0,
          scale: 0.5,
          y: -20,
          ease: "back.in(1.2)",
          onComplete: () => {
            uploadedPhotos.value.splice(index, 1);
            showStatus('Photo deleted', 'info');
          }
        });
      } else {
        uploadedPhotos.value.splice(index, 1);
        showStatus('Photo deleted', 'info');
      }
    };

    const clearAllPhotos = () => {
      if (uploadedPhotos.value.length === 0) return;
      
      // Animate all photos out
      gsap.to('.photo-item', {
        duration: 0.4,
        opacity: 0,
        scale: 0.8,
        y: -30,
        stagger: 0.05,
        ease: "back.in(1.1)",
        onComplete: () => {
          uploadedPhotos.value = [];
          showStatus('All photos cleared', 'info');
        }
      });
    };

    const showStatus = (message, type) => {
      statusMessage.value = message;
      statusType.value = type;
      
      // Auto-hide status message after 3 seconds
      setTimeout(() => {
        statusMessage.value = '';
      }, 3000);
    };

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return {
      dropZone,
      fileInput,
      isDragover,
      isUploading,
      uploadProgress,
      uploadedPhotos,
      statusMessage,
      statusType,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      triggerFileInput,
      handleFileSelect,
      deletePhoto,
      clearAllPhotos,
      animatePhotoIn,
      animatePhotoOut,
      formatFileSize,
    };
  }
};
</script>

<style scoped>
.photo-uploader {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.subtitle {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.upload-area {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  border: 3px dashed #4a90e2;
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.upload-area:hover {
  background: linear-gradient(135deg, #eef2f7 0%, #d9e6f2 100%);
  border-color: #357ae8;
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.upload-area.is-dragover {
  background: linear-gradient(135deg, #e1e9f2 0%, #c6d9ed 100%);
  border-color: #2a65c9;
  border-style: solid;
  transform: translateY(-5px);
}

.upload-area.is-uploading {
  border-color: #f39c12;
}

.upload-content {
  pointer-events: none;
}

.upload-icon {
  margin: 0 auto 1.5rem;
  color: #4a90e2;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(74, 144, 226, 0.1);
}

.upload-area h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.upload-area p {
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.browse-link {
  color: #4a90e2;
  font-weight: 600;
  text-decoration: underline;
  pointer-events: auto;
  cursor: pointer;
}

.formats {
  font-size: 0.9rem;
  color: #95a5a6;
  margin-top: 1rem;
}

.file-input {
  display: none;
}

.upload-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #f39c12, #f1c40f);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  color: #f39c12;
  font-weight: 600;
  margin: 0;
  font-size: 0.9rem;
}

.section-title {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.photo-item {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.photo-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  overflow: hidden;
}

.photo-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 1rem;
}

.photo-item:hover .photo-overlay {
  opacity: 1;
}

.delete-btn {
  align-self: flex-end;
  background-color: #e74c3c;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.photo-info {
  color: white;
}

.photo-name {
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.photo-size {
  font-size: 0.8rem;
  color: #ecf0f1;
}

.actions {
  text-align: center;
  margin-top: 2rem;
}

.clear-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
}

.status-message {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  z-index: 1000;
  animation: slideIn 0.5s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.status-message.success {
  background-color: #2ecc71;
}

.status-message.error {
  background-color: #e74c3c;
}

.status-message.info {
  background-color: #3498db;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .photo-uploader {
    padding: 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .upload-area {
    padding: 2rem 1rem;
  }
  
  .photos-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .status-message {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    text-align: center;
  }
}
</style>