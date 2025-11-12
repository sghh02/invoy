/**
 * InFree - 共通ユーティリティ関数
 */

// ==================== //
// サイドバートグル
// ==================== //
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('mobile-open');
  }
}

// サイドバー外クリックで閉じる
function initSidebarCloseOnOutsideClick() {
  document.addEventListener('click', function (event) {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const toggleButtons = document.querySelectorAll('.header-toggle, .sidebar-toggle, .mobile-menu-btn');

    // クリックされた要素がサイドバーまたはトグルボタンでない場合
    if (!sidebar.contains(event.target) &&
        !Array.from(toggleButtons).some(btn => btn.contains(event.target))) {
      sidebar.classList.remove('mobile-open');
    }
  });
}

// ウィンドウリサイズイベント
function initSidebarResize() {
  window.addEventListener('resize', function () {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth > 992) {
      sidebar.classList.remove('mobile-open');
    }
  });
}

// ==================== //
// パスワード表示切替
// ==================== //
function setupPasswordToggle(toggleId, inputId) {
  const toggle = document.getElementById(toggleId);
  const input = document.getElementById(inputId);

  if (!toggle || !input) return;

  toggle.addEventListener('click', function () {
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);

    // アイコンの切り替え
    const eyeIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    const eyeOffIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';

    this.innerHTML = type === 'password' ? eyeIcon : eyeOffIcon;
  });
}

// ==================== //
// パスワード強度チェック
// ==================== //
function initPasswordStrength(inputId, barId, textId) {
  const passwordInput = document.getElementById(inputId);
  const strengthBar = document.getElementById(barId);
  const strengthText = document.getElementById(textId);

  if (!passwordInput || !strengthBar || !strengthText) return;

  passwordInput.addEventListener('input', function () {
    const password = this.value;
    let strength = 0;
    let strengthClass = '';
    let strengthMessage = '';

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    if (password.length === 0) {
      strengthClass = '';
      strengthMessage = 'パスワードの強度';
    } else if (strength <= 2) {
      strengthClass = 'strength-weak';
      strengthMessage = '弱い';
    } else if (strength <= 3) {
      strengthClass = 'strength-medium';
      strengthMessage = '普通';
    } else {
      strengthClass = 'strength-strong';
      strengthMessage = '強い';
    }

    strengthBar.className = 'strength-bar ' + strengthClass;
    strengthText.textContent = strengthMessage;
  });
}

// ==================== //
// フォームバリデーション
// ==================== //
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validateRequired(value) {
  return value && value.trim().length > 0;
}

function validateMinLength(value, minLength) {
  return value && value.length >= minLength;
}

function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);

  if (input) input.classList.add('error');
  if (error) {
    error.textContent = message;
    error.classList.add('show');
  }
}

function hideError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);

  if (input) input.classList.remove('error');
  if (error) error.classList.remove('show');
}

// ==================== //
// ローディング状態管理
// ==================== //
function setButtonLoading(buttonElement, isLoading, originalText = '') {
  if (!buttonElement) return;

  if (isLoading) {
    buttonElement.disabled = true;
    buttonElement.dataset.originalText = buttonElement.textContent;
    buttonElement.textContent = 'ローディング中...';
  } else {
    buttonElement.disabled = false;
    buttonElement.textContent = originalText || buttonElement.dataset.originalText || 'Submit';
  }
}

// ==================== //
// 通知・トースト
// ==================== //
function showToast(message, type = 'info', duration = 3000) {
  // 既存のトーストを削除
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  // トースト要素を作成
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    font-size: 14px;
    font-weight: 500;
    animation: slideInRight 0.3s ease-out;
  `;

  document.body.appendChild(toast);

  // 自動削除
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ==================== //
// データフォーマット
// ==================== //
function formatCurrency(amount) {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY'
  }).format(amount);
}

function formatDate(date) {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

// ==================== //
// ローカルストレージヘルパー
// ==================== //
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Storage save error:', error);
    return false;
  }
}

function loadFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Storage load error:', error);
    return defaultValue;
  }
}

function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Storage remove error:', error);
    return false;
  }
}

// ==================== //
// ファイルアップロードヘルパー
// ==================== //
function initFileUpload(inputId, previewId, options = {}) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  if (!input) return;

  const maxSize = options.maxSize || 5 * 1024 * 1024; // 5MB default
  const allowedTypes = options.allowedTypes || ['image/jpeg', 'image/png', 'image/gif'];

  input.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // ファイルサイズチェック
    if (file.size > maxSize) {
      showToast(`ファイルサイズは${maxSize / 1024 / 1024}MB以下にしてください`, 'error');
      input.value = '';
      return;
    }

    // ファイルタイプチェック
    if (!allowedTypes.includes(file.type)) {
      showToast('サポートされていないファイル形式です', 'error');
      input.value = '';
      return;
    }

    // プレビュー表示
    if (preview && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }

    if (options.onSuccess) {
      options.onSuccess(file);
    }
  });
}

// ==================== //
// ドラッグ&ドロップ
// ==================== //
function initDragAndDrop(dropZoneId, inputId, options = {}) {
  const dropZone = document.getElementById(dropZoneId);
  const input = document.getElementById(inputId);

  if (!dropZone || !input) return;

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.add('drag-over');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.remove('drag-over');
    }, false);
  });

  dropZone.addEventListener('drop', function(e) {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      input.files = files;

      // change イベントをトリガー
      const event = new Event('change', { bubbles: true });
      input.dispatchEvent(event);

      if (options.onDrop) {
        options.onDrop(files[0]);
      }
    }
  }, false);
}

// ==================== //
// 初期化
// ==================== //
document.addEventListener('DOMContentLoaded', function() {
  // サイドバー関連の初期化
  initSidebarCloseOnOutsideClick();
  initSidebarResize();
});
