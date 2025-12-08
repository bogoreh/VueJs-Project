<template>
  <div class="form-container">
    <StepIndicator :steps="steps" :current-step="currentStep" />
    
    <div class="form-wrapper" ref="formWrapper">
      <!-- Step 1: Personal Information -->
      <div v-if="currentStep === 1" class="form-step" ref="step1">
        <h2>Personal Information</h2>
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            v-model="formData.firstName"
            :class="{ 'error': errors.firstName }"
            @input="clearError('firstName')"
          />
          <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
        </div>
        
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input 
            type="text" 
            id="lastName" 
            v-model="formData.lastName"
            :class="{ 'error': errors.lastName }"
            @input="clearError('lastName')"
          />
          <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email"
            :class="{ 'error': errors.email }"
            @input="clearError('email')"
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
      </div>
      
      <!-- Step 2: Account Details -->
      <div v-if="currentStep === 2" class="form-step" ref="step2">
        <h2>Account Details</h2>
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="formData.username"
            :class="{ 'error': errors.username }"
            @input="clearError('username')"
          />
          <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="formData.password"
            :class="{ 'error': errors.password }"
            @input="clearError('password')"
          />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="formData.confirmPassword"
            :class="{ 'error': errors.confirmPassword }"
            @input="clearError('confirmPassword')"
          />
          <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
        </div>
      </div>
      
      <!-- Step 3: Preferences -->
      <div v-if="currentStep === 3" class="form-step" ref="step3">
        <h2>Preferences</h2>
        <div class="form-group">
          <label>Newsletter Subscription</label>
          <div class="checkbox-group">
            <input 
              type="checkbox" 
              id="newsletter" 
              v-model="formData.newsletter"
            />
            <label for="newsletter">Subscribe to our newsletter</label>
          </div>
        </div>
        
        <div class="form-group">
          <label>Account Type</label>
          <div class="radio-group">
            <div class="radio-option">
              <input 
                type="radio" 
                id="personal" 
                value="personal" 
                v-model="formData.accountType"
              />
              <label for="personal">Personal Account</label>
            </div>
            <div class="radio-option">
              <input 
                type="radio" 
                id="business" 
                value="business" 
                v-model="formData.accountType"
              />
              <label for="business">Business Account</label>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="bio">Bio (Optional)</label>
          <textarea 
            id="bio" 
            v-model="formData.bio"
            rows="4"
            placeholder="Tell us a little about yourself..."
          ></textarea>
        </div>
      </div>
      
      <!-- Step 4: Confirmation -->
      <div v-if="currentStep === 4" class="form-step" ref="step4">
        <h2>Confirmation</h2>
        <div class="summary">
          <h3>Please review your information:</h3>
          <div class="summary-item">
            <strong>Name:</strong> {{ formData.firstName }} {{ formData.lastName }}
          </div>
          <div class="summary-item">
            <strong>Email:</strong> {{ formData.email }}
          </div>
          <div class="summary-item">
            <strong>Username:</strong> {{ formData.username }}
          </div>
          <div class="summary-item">
            <strong>Account Type:</strong> {{ formData.accountType }}
          </div>
          <div class="summary-item">
            <strong>Newsletter:</strong> {{ formData.newsletter ? 'Subscribed' : 'Not Subscribed' }}
          </div>
          <div v-if="formData.bio" class="summary-item">
            <strong>Bio:</strong> {{ formData.bio }}
          </div>
        </div>
      </div>
      
      <!-- Navigation Buttons -->
      <div class="navigation">
        <button 
          v-if="currentStep > 1" 
          @click="previousStep"
          class="btn btn-secondary"
        >
          Previous
        </button>
        
        <button 
          v-if="currentStep < totalSteps" 
          @click="nextStep"
          class="btn btn-primary"
        >
          Next
        </button>
        
        <button 
          v-if="currentStep === totalSteps" 
          @click="submitForm"
          class="btn btn-success"
        >
          Submit
        </button>
      </div>
    </div>
    
    <!-- Success Message -->
    <div v-if="showSuccess" class="success-message">
      <h2>🎉 Registration Successful!</h2>
      <p>Thank you for registering. We've sent a confirmation email to {{ formData.email }}</p>
      <button @click="resetForm" class="btn btn-primary">Register Another User</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { gsap } from 'gsap'
import StepIndicator from './StepIndicator.vue'

const steps = ['Personal Info', 'Account Details', 'Preferences', 'Confirmation']
const totalSteps = steps.length
const currentStep = ref(1)
const showSuccess = ref(false)
const formWrapper = ref(null)

// Form data model
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  newsletter: true,
  accountType: 'personal',
  bio: ''
})

// Error tracking
const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
})

// Animation functions
const animateStepOut = (callback) => {
  gsap.to(formWrapper.value.querySelector('.form-step'), {
    duration: 0.3,
    opacity: 0,
    x: -50,
    onComplete: callback
  })
}

const animateStepIn = () => {
  gsap.fromTo(formWrapper.value.querySelector('.form-step'),
    { opacity: 0, x: 50 },
    { duration: 0.5, opacity: 1, x: 0 }
  )
}

// Validation functions
const validateStep1 = () => {
  let isValid = true
  
  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required'
    isValid = false
  }
  
  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required'
    isValid = false
  }
  
  if (!formData.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email'
    isValid = false
  }
  
  return isValid
}

const validateStep2 = () => {
  let isValid = true
  
  if (!formData.username.trim()) {
    errors.username = 'Username is required'
    isValid = false
  } else if (formData.username.length < 3) {
    errors.username = 'Username must be at least 3 characters'
    isValid = false
  }
  
  if (!formData.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    isValid = false
  }
  
  return isValid
}

const clearError = (field) => {
  errors[field] = ''
}

// Navigation functions
const nextStep = () => {
  let isValid = true
  
  switch (currentStep.value) {
    case 1:
      isValid = validateStep1()
      break
    case 2:
      isValid = validateStep2()
      break
  }
  
  if (isValid) {
    animateStepOut(() => {
      currentStep.value++
      animateStepIn()
    })
  }
}

const previousStep = () => {
  animateStepOut(() => {
    currentStep.value--
    animateStepIn()
  })
}

const submitForm = () => {
  // Show success animation
  gsap.to(formWrapper.value, {
    duration: 0.5,
    opacity: 0,
    y: -20,
    onComplete: () => {
      showSuccess.value = true
      gsap.fromTo('.success-message',
        { opacity: 0, y: 20 },
        { duration: 0.5, opacity: 1, y: 0 }
      )
    }
  })
}

const resetForm = () => {
  // Reset form data
  Object.keys(formData).forEach(key => {
    if (key === 'newsletter') {
      formData[key] = true
    } else if (key === 'accountType') {
      formData[key] = 'personal'
    } else {
      formData[key] = ''
    }
  })
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  // Reset UI
  showSuccess.value = false
  currentStep.value = 1
  
  // Animate back to form
  gsap.fromTo(formWrapper.value,
    { opacity: 0, y: -20 },
    { duration: 0.5, opacity: 1, y: 0 }
  )
}

// Initial animation on mount
onMounted(() => {
  gsap.from('.form-container', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-wrapper {
  position: relative;
  min-height: 400px;
}

.form-step {
  padding: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

.form-group input.error {
  border-color: #ff4757;
}

.error-message {
  color: #ff4757;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.checkbox-group,
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-primary:hover {
  background-color: #3aa876;
}

.btn-secondary {
  background-color: #f1f1f1;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-success {
  background-color: #35495e;
  color: white;
}

.btn-success:hover {
  background-color: #2c3e50;
}

.summary {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
}

.summary h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #35495e;
}

.summary-item {
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
}

.summary-item:last-child {
  border-bottom: none;
}

.success-message {
  text-align: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.success-message h2 {
  color: #42b883;
  margin-bottom: 1rem;
}
</style>