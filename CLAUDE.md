# CLAUDE.md - InFree プロジェクト設定

## 言語設定

このプロジェクトでは**日本語**を使用してください。すべてのコミュニケーション、コード内のコメント、ドキュメント、エラーメッセージは日本語で行ってください。

## プロジェクト概要

InFreeは、フリーランスや中小企業向けの請求書管理Webアプリケーションです。

### 技術スタック

- **フロントエンド**: HTML5, CSS3 (カスタムプロパティ使用), Vanilla JavaScript
- **デザインシステム**: カスタムデザインシステム (common.css)
- **ユーティリティ**: 共通JavaScript関数 (utils.js)

## プロジェクト構成

```
/home/user/invoy/
├── common.css              # 共通スタイルシート
├── utils.js                # 共通ユーティリティ関数
├── login.html              # ログインページ
├── signup.html             # 新規登録ページ
├── dashboard.html          # ダッシュボード
├── settings.html           # 設定ページ
├── create-invoice.html     # 請求書作成ページ
├── invoice-list.html       # 請求書一覧ページ
├── help.html               # ヘルプページ
├── invoices.html           # 請求書（ダークテーマ版）
├── hive.html               # Flutter Hive実装ガイド
└── account-settings-dialog.html  # アカウント設定モーダル
```

## 開発ガイドライン

### コーディング規約

1. **DRY原則を遵守**
   - 共通のスタイルは `common.css` に記述
   - 共通の関数は `utils.js` に記述
   - ページ固有のスタイル・スクリプトのみ各HTMLファイルに記述

2. **CSS設計**
   - CSS変数（カスタムプロパティ）を活用
   - BEM命名規則に準ずる
   - レスポンシブデザイン対応（モバイルファースト）

3. **JavaScript**
   - Vanilla JavaScriptを使用（フレームワーク不使用）
   - グローバル変数は最小限に
   - utils.jsの関数を積極的に活用

### 共通リソース

#### common.css に含まれるスタイル

- CSSリセット & ベーススタイル
- CSS変数（カラーパレット、スペーシング、シャドウ、角丸）
- サイドバーコンポーネント
- ナビゲーションメニュー
- フォーム要素（input, textarea, select, checkbox）
- ボタンスタイル（primary, secondary, danger）
- カードコンポーネント
- ユーザープロフィール表示
- レスポンシブデザイン（ブレークポイント: 1600px, 1400px, 1200px, 992px, 768px, 480px）

#### utils.js に含まれる関数

**サイドバー管理:**
- `toggleSidebar()` - サイドバーの開閉
- `initSidebarCloseOnOutsideClick()` - 外部クリックで閉じる
- `initSidebarResize()` - リサイズ時の処理

**パスワード関連:**
- `setupPasswordToggle(toggleId, inputId)` - パスワード表示切替
- `initPasswordStrength(inputId, barId, textId)` - パスワード強度チェック

**バリデーション:**
- `validateEmail(email)` - メールアドレス検証
- `validateRequired(value)` - 必須項目検証
- `validateMinLength(value, minLength)` - 最小文字数検証
- `showError(inputId, errorId, message)` - エラー表示
- `hideError(inputId, errorId)` - エラー非表示

**UI関連:**
- `setButtonLoading(buttonElement, isLoading, originalText)` - ローディング状態管理
- `showToast(message, type, duration)` - トースト通知表示

**データフォーマット:**
- `formatCurrency(amount)` - 通貨フォーマット（日本円）
- `formatDate(date)` - 日付フォーマット（日本語）

**ストレージ:**
- `saveToStorage(key, value)` - ローカルストレージ保存
- `loadFromStorage(key, defaultValue)` - ローカルストレージ読込
- `removeFromStorage(key)` - ローカルストレージ削除

**ファイル関連:**
- `initFileUpload(inputId, previewId, options)` - ファイルアップロード初期化
- `initDragAndDrop(dropZoneId, inputId, options)` - ドラッグ&ドロップ初期化

### 新しいページを作成する場合

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>InFree - ページタイトル</title>
    <link rel="stylesheet" href="common.css">
    <style>
        /* ページ固有のスタイルのみここに記述 */
    </style>
</head>
<body>
    <!-- サイドバー -->
    <aside class="sidebar" id="sidebar">
        <!-- サイドバーの内容 -->
    </aside>

    <!-- メインコンテンツ -->
    <main class="main-content">
        <!-- ページコンテンツ -->
    </main>

    <script src="utils.js"></script>
    <script>
        // ページ固有のスクリプトのみここに記述
        document.addEventListener('DOMContentLoaded', function() {
            // 初期化処理
        });
    </script>
</body>
</html>
```

## Git ワークフロー

### ブランチ命名規則

- 機能追加: `feature/機能名`
- バグ修正: `fix/問題の説明`
- リファクタリング: `refactor/対象`
- Claude作業用: `claude/タスク名-セッションID`

### コミットメッセージ

日本語で明確に記述:

```
種類: 簡潔な説明

詳細な説明（必要に応じて）

- 変更点1
- 変更点2
```

**種類の例:**
- `追加:` - 新機能追加
- `修正:` - バグ修正
- `更新:` - 既存機能の改善
- `リファクタリング:` - コード整理
- `ドキュメント:` - ドキュメント変更

## デザインシステム

### カラーパレット

```css
--primary-color: #4F46E5;      /* メインカラー（紫） */
--primary-hover: #4338CA;      /* ホバー時 */
--secondary-color: #10B981;    /* セカンダリ（緑） */
--warning-color: #F59E0B;      /* 警告（オレンジ） */
--danger-color: #EF4444;       /* 危険（赤） */
--info-color: #3B82F6;         /* 情報（青） */
```

### スペーシング

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 24px;
--spacing-2xl: 32px;
```

### 角丸

```css
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
```

## レスポンシブブレークポイント

- **1600px以上**: 大画面デスクトップ
- **1400px以下**: 中画面デスクトップ
- **1200px以下**: 小画面ラップトップ
- **992px以下**: タブレット（サイドバーが隠れる）
- **768px以下**: 大画面スマートフォン
- **480px以下**: 小画面スマートフォン

## 注意事項

### 最適化されていないファイル

以下のファイルは特殊な目的があるため、意図的に最適化していません:

1. **invoices.html** - ダークテーマの独自デザイン
2. **hive.html** - Flutterドキュメントページ
3. **account-settings-dialog.html** - スタンドアロンモーダルコンポーネント

これらのファイルを編集する際は、既存のデザインを尊重してください。

## テスト

- ブラウザの開発者ツールでレスポンシブデザインを確認
- 複数のブレークポイントでテスト
- JavaScriptエラーがないことをコンソールで確認

## 質問・問題

プロジェクトに関する質問や問題がある場合は、日本語で明確に説明してください。
