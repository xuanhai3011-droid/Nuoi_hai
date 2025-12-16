// ============================================
// SMOOTH SCROLL & ANIMATIONS
// ============================================

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all pricing cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.pricing-card');
  cards.forEach(card => {
    observer.observe(card);
  });
});

// ============================================
// BUTTON INTERACTIONS
// ============================================

// Header support button
const supportBtn = document.getElementById('supportBtn');
supportBtn.addEventListener('click', () => {
  // Scroll to pricing section
  const pricingSection = document.querySelector('.pricing-container');
  pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  // Add pulse animation to featured card
  const featuredCard = document.querySelector('.pricing-card.featured');
  featuredCard.style.animation = 'none';
  setTimeout(() => {
    featuredCard.style.animation = 'pulse 0.5s ease-in-out';
  }, 10);
});

// Select plan buttons
const selectButtons = document.querySelectorAll('.btn-select');
selectButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.pricing-card');
    const planName = card.querySelector('.plan-name').textContent;
    const price = card.querySelector('.price').textContent;
    
    // Create ripple effect
    createRipple(e);
    
    // Show selection feedback
    showSelectionFeedback(planName, price);
  });
});

// ============================================
// RIPPLE EFFECT
// ============================================
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
  .btn-select {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// SELECTION FEEDBACK
// ============================================
function showSelectionFeedback(planName, price) {
  // Create modal/notification
  const notification = document.createElement('div');
  notification.className = 'selection-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">✓</div>
      <h3>Bạn đã chọn ${planName}</h3>
      <p>${price}</p>
      <p class="notification-message">Cảm ơn bạn đã quan tâm! Đây là demo, chưa có chức năng thanh toán thực tế.</p>
      <button class="notification-close">Đóng</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Add styles for notification
  const notificationStyle = document.createElement('style');
  notificationStyle.textContent = `
    .selection-notification {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease-out;
    }
    
    .notification-content {
      background: white;
      padding: 40px;
      border-radius: 16px;
      text-align: center;
      max-width: 400px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideUp 0.3s ease-out;
    }
    
    .notification-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(90deg, #FF6B35 0%, #F7931E 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin: 0 auto 20px;
    }
    
    .notification-content h3 {
      color: #FF6B35;
      margin-bottom: 10px;
      font-size: 24px;
    }
    
    .notification-content p {
      color: #666;
      margin-bottom: 10px;
    }
    
    .notification-message {
      font-size: 14px;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
    
    .notification-close {
      margin-top: 20px;
      padding: 12px 32px;
      background: linear-gradient(90deg, #FF6B35 0%, #F7931E 100%);
      color: white;
      border: none;
      border-radius: 25px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .notification-close:hover {
      transform: translateY(-2px);
    }
    
    @keyframes slideUp {
      from {
        transform: translateY(50px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(notificationStyle);
  
  // Close notification
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
      notification.remove();
      notificationStyle.remove();
    }, 300);
  });
  
  // Close on background click
  notification.addEventListener('click', (e) => {
    if (e.target === notification) {
      closeBtn.click();
    }
  });
}

// ============================================
// CARD HOVER EFFECTS
// ============================================
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    // Add subtle scale to features
    const features = card.querySelectorAll('.feature-item');
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.style.transform = 'translateX(5px)';
      }, index * 30);
    });
  });
  
  card.addEventListener('mouseleave', () => {
    // Reset features
    const features = card.querySelectorAll('.feature-item');
    features.forEach(feature => {
      feature.style.transform = 'translateX(0)';
    });
  });
});

// ============================================
// FEATURE ITEM TRANSITIONS
// ============================================
const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach(item => {
  item.style.transition = 'all 0.3s ease-out';
});

// ============================================
// SCROLL TO TOP ON LOGO CLICK
// ============================================
const logo = document.querySelector('.logo');
logo.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const hero = document.querySelector('.hero');
  
  // Parallax effect for hero
  if (hero) {
    hero.style.transform = `translateY(${currentScrollY * 0.3}px)`;
    hero.style.opacity = 1 - (currentScrollY / 500);
  }
  
  lastScrollY = currentScrollY;
});

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================
document.addEventListener('keydown', (e) => {
  // Press 1, 2, or 3 to select plans
  if (e.key === '1' || e.key === '2' || e.key === '3') {
    const index = parseInt(e.key) - 1;
    const buttons = document.querySelectorAll('.btn-select');
    if (buttons[index]) {
      buttons[index].click();
      buttons[index].focus();
    }
  }
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c🍜 Nuôi Tôi', 'font-size: 24px; font-weight: bold; background: linear-gradient(90deg, #FF6B35 0%, #F7931E 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cCảm ơn bạn đã quan tâm đến dự án! 💖', 'font-size: 14px; color: #666;');
console.log('%cTip: Nhấn phím 1, 2, hoặc 3 để chọn gói nhanh!', 'font-size: 12px; color: #FF6B35;');
