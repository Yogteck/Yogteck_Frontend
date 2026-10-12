import { LocaleDictionary } from './locale-strings.interface';

export const jaJpDictionary: LocaleDictionary = {
  _meta: {
    locale: 'ja-jp',
    language: '日本語',
    country: '日本',
    needsReview: true,
    lastUpdated: '2026-10-12'
  },

  seo: {
    title: 'クラウドERP・業務システム開発・Web開発会社 | YOGTECK',
    description: '日本企業向けクラウドERP開発、SaaS構築、高機能Web・モバイルアプリ開発。高品質なフルスタックITソリューションをYOGTECKが提供いたします。',
    keywords: 'ERP開発 日本, SaaS開発, 業務システム開発, Webシステム受託開発, オフショアIT開発, YOGTECK'
  },

  nav: {
    home: 'ホーム',
    services: 'サービス',
    growthJourney: '開発プロセス',
    projects: '実績紹介',
    clients: '取引先実績',
    locations: 'グローバル拠点',
    about: '会社概要',
    contact: 'お問い合わせ',
    getQuoteBtn: '無料お見積り',
    callNow: '担当者へ連絡',
    selectLanguage: '国・言語の選択'
  },

  hero: {
    badge: '貴社のグローバルDX・開発パートナー',
    titleLine1: 'ビジネスを加速させる',
    titleLine2Prefix: '次世代の',
    titleLine2Highlight: 'クラウド技術',
    titleLine2Suffix: 'なら',
    brandName: 'YOGTECK',
    subcopy: 'YOGTECKは、クラウドERP、SaaS、モダンWebアプリ、EC構築まで、企業の成長を支える高品質なITシステムを開発・提供しております。',
    ctaPrimary: '無料相談を申し込む',
    ctaSecondary: '開発プロセスを見る',
    trustExp: '5年以上の実績',
    trustHosting: 'クラウド環境・DevOps対応',
    trustSupport: '専任サポート・迅速な対応',
    cubes: {
      erp: 'ERP',
      saas: 'SaaS',
      crm: 'CRM',
      pos: 'POS'
    },
    orbitTags: ['Cloud', 'API', 'E-commerce', 'Billing', 'Mobile apps', 'SEO']
  },

  heroForm: {
    badge: 'スピード相談窓口',
    title: 'システム開発の無料ご相談・お見積り',
    subtitle: '経験豊富なシニアアーキテクトが2〜4営業時間以内にご連絡いたします',
    nameLabel: 'ご担当者様氏名 *',
    namePlaceholder: '例：山田 太郎',
    phoneLabel: 'お電話番号 / WhatsApp *',
    phonePlaceholder: '例：+81 90 1234 5678',
    emailLabel: '会社用メールアドレス *',
    emailPlaceholder: 'name@company.co.jp',
    serviceLabel: 'ご希望のソリューション *',
    captchaLabel: 'セキュリティ確認計算 *',
    captchaPlaceholder: '計算結果を入力',
    captchaError: 'セキュリティ計算の答えを正しくご入力ください。',
    submitBtn: '見積り・相談を依頼する',
    submittingBtn: '送信中...',
    successTitle: 'お問い合わせを承りました',
    successMessage: 'YOGTECKへのお問い合わせありがとうございます。担当者より2〜4営業時間以内にご連絡申し上げます。',
    errorMessage: '送信に失敗いたしました。お手数ですが、再度お試しいただくかWhatsAppにてご連絡ください。'
  },

  features: {
    fastDeliveryTitle: '迅速なアジャイル開発',
    fastDeliveryDesc: 'スプリントごとの確実なマイルストーンで、高品質なプロダクトを迅速にお届けします。',
    transparentPricingTitle: '明確で透明性の高い料金体系',
    transparentPricingDesc: '隠れた追加費用は一切ありません。ご予算に合わせた最適なプランをご提案します。',
    dedicatedEngineersTitle: '経験豊富なフルスタック技術者',
    dedicatedEngineersDesc: 'Angular、Node.js、Python、クラウド設計に精通したシニアエンジニアが担当します。',
    longTermSupportTitle: 'SLA保証付きの運用・保守サポート',
    longTermSupportDesc: '納品後もシステムの安定稼働を支えるインフラ監視とセキュリティ対策を提供します。'
  },

  journey: {
    badge: '確実な開発フレームワーク',
    heading: '要件定義からグローバル展開までの4ステップ',
    lead: '複雑な業務課題をスムーズに解決する、体系化された開発ライフサイクルを実践しています。',
    step1Title: '要件ヒアリング・アーキテクチャ設計',
    step1Desc: '業務フローを詳細にヒアリングし、API設計、データ構造、セキュリティ基準を策定します。',
    step2Title: 'UI/UXデザイン・プロトタイプ作成',
    step2Desc: '直感的で扱いやすい操作性を重視し、ユーザー視点に立ったインターフェースを設計します。',
    step3Title: 'フルスタック開発・自動テスト検証',
    step3Desc: '保守性の高いクリーンコードを作成し、CI/CDによる自動テストと負荷検証を徹底します。',
    step4Title: 'クラウド環境への本番展開・継続的改善',
    step4Desc: 'AWS/GCP環境への安全なデプロイ、バックアップ体制の構築、機能拡張を支援します。'
  },

  services: {
    badge: '包括的なデジタルソリューション',
    heading: '企業の競争力を高める最新のソフトウェア開発',
    lead: '拡張性と堅牢性を両立した、長期的価値を生み出すシステムを構築します。',
    exploreBtn: '詳細を見る',
    requestQuoteBtn: 'お見積り依頼',
    items: {
      webTitle: 'モダンWebアプリケーション開発',
      webDesc: 'SPAおよびPWA技術を活用した、高速かつレスポンシブな次世代Webプラットフォームを構築します。',
      softwareTitle: 'オーダーメイド業務システム & SaaS開発',
      softwareDesc: 'マルチテナント型クラウドSaaSや、企業特有の業務フローに最適化した専用ソフトウェアを開発します。',
      mobileTitle: 'クロスプラットフォーム・モバイルアプリ開発',
      mobileDesc: 'FlutterやReact Nativeを用いた、iOS・Android両対応のネイティブ品質アプリを迅速に開発します。',
      erpTitle: 'クラウドERP・基幹業務統合システム',
      erpDesc: '在庫管理、サプライチェーン、生産管理（BOM）、会計をシームレスに一元管理するERPを構築します。',
      billingTitle: '電子インボイス・請求管理・POSシステム',
      billingDesc: '複数通貨や税制（消費税・VAT）に対応した自動請求書発行、POSレジ、決済連携システムです。',
      ecommerceTitle: 'オムニチャネルEC・マーケットプレイス開発',
      ecommerceDesc: '高トラフィックに耐えうるヘッドレスECサイトやモール型プラットフォームを開発します。',
      seoTitle: 'テクニカルSEO & デジタルマーケティング',
      seoDesc: '国際SEO、構造化データ最適化、サイト高速化を通じて、検索エンジンからの集客を最大化します。',
      businessTitle: 'CRM & 業務自動化プラットフォーム',
      businessDesc: '顧客情報の一元管理、商談パイプラインの可視化、社内ワークフローの自動化を実現します。'
    }
  },

  marketplaces: {
    badge: 'オムニチャネル連携',
    heading: '世界の主要マーケットプレイスとシステムを直結',
    lead: '基幹ERPと各種ECモール間の在庫データや注文情報を自動連携いたします。',
    channelAmazon: 'Amazon グローバル連携',
    channelFlipkart: 'Flipkart 出品管理連携',
    channelMeesho: 'Meesho カタログ自動連携',
    channelWalmart: 'Walmart マーケットプレイスAPI連携',
    channelGoogle: 'Google Merchant Center・ショッピング連携',
    cta: 'モール連携のご相談'
  },

  about: {
    badge: 'YOGTECKが選ばれる理由',
    heading: '妥協のない技術品質と誠実な開発姿勢',
    lead: 'エンタープライズ品質の先進技術を、成長企業の皆様へ適正な価格でお届けします。',
    expCount: '5+',
    expLabel: '年の実績と専門知識',
    projectsCount: '150+',
    projectsLabel: '以上の開発・納品実績',
    clientSatisfactionCount: '99%',
    clientSatisfactionLabel: '顧客満足度・納期遵守率',
    reason1Title: '技術的負債を残さないクリーンコード',
    reason1Desc: '設計パターンを徹底し、将来の機能追加や改修が容易なモジュール構造を採用しています。',
    reason2Title: '厳格なセキュリティと情報保護',
    reason2Desc: '通信暗号化、アクセス権限管理、国際基準に準拠した強固なデータ保護を実施しています。',
    reason3Title: 'リード技術者とのダイレクトな対話',
    reason3Desc: '仲介会社を挟まず、専任のプロジェクトリーダーやエンジニアと直接円滑に意思疎通が可能です。'
  },

  clients: {
    badge: '信頼の実績',
    heading: '各業界をリードする企業様のシステムを構築',
    lead: '製造業、医療、物流、小売など、幅広い業種でご信頼をいただいております。'
  },

  projects: {
    badge: '主要な開発事例',
    heading: '確かな成果をもたらした開発プロジェクト',
    lead: 'YOGTECKが手掛けた、業務効率向上に貢献したシステムの一部をご紹介します。',
    viewLive: '事例詳細を見る',
    project1Title: 'MMR建設 ERP・施工管理プラットフォーム',
    project1Category: '建設・製造向けクラウドERP',
    project1Desc: '資機材の管理、工種ごとの進捗確認、外注コスト管理を一元化したクラウド基幹システムです。',
    project2Title: 'オムニチャネル小売・複数拠点在庫管理',
    project2Category: '店舗POS・物流管理',
    project2Desc: '複数店舗のレジ機能、バーコード在庫管理、自動配送連携を一体化したソリューションです。',
    project3Title: 'Yogkart 医療・オンライン調剤PWA',
    project3Category: '医療・ヘルスケアシステム',
    project3Desc: '安全な電子処方箋管理、調剤薬局向け在庫追跡、オンライン相談機能を実装した医療アプリです。'
  },

  locations: {
    badge: 'グローバル展開拠点',
    heading: '開発拠点およびクライアント支援体制',
    lead: 'インド開発拠点を中心に、北米、中東、アジア太平洋地域のお客様を支援しております。',
    hqTitle: '開発総本部（インド）',
    hqDesc: 'Registered Office: 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, Uttar Pradesh, 208015, India.',
    hubKanpurTitle: 'カンプール技術開発センター',
    hubKanpurDesc: 'バックエンド、クラウドインフラ、セキュリティチームが集結する主要開発拠点です。',
    hubKanpurCta: 'カンプール拠点について →',
    hubLucknowTitle: 'ラクナウ・エンタープライズ拠点',
    hubLucknowDesc: '産業界および大手クライアントへのコンサルティングと導入支援を行う拠点です。',
    hubLucknowCta: 'ラクナウ拠点について →',
    hubRaebareliTitle: 'レイバレーリ・産業システム拠点',
    hubRaebareliDesc: '製造業向け工場自動化システムおよび生産管理を専門とする開発部門です。',
    hubRaebareliCta: 'レイバレーリ拠点について →'
  },

  faq: {
    badge: 'よくあるご質問',
    heading: 'FAQ',
    lead: '開発体制やご契約、対応技術に関する一般的なご質問にお答えします。',
    items: [
      {
        question: 'YOGTECKではどのようなプログラミング言語・技術を使用していますか？',
        answer: 'Angular、React、Next.js、Node.js、Python、Flutter、PostgreSQL、MongoDB、Docker、AWS、Google Cloud等のモダンな技術スタックを専門としております。'
      },
      {
        question: '日本企業とのプロジェクト進行やコミュニケーションはどのように行われますか？',
        answer: 'オンライン会議ツール、Slack、メール等を活用し、専任プロジェクトマネージャーが定期的な報告と進捗の可視化を実施いたします。'
      },
      {
        question: '既存の古いシステムからクラウドへの移行は可能ですか？',
        answer: 'はい、ダウンタイムを最小限に抑えたデータベース移行や、マイクロサービス化による段階的なシステム刷新を行っております。'
      },
      {
        question: '著作権や秘密保持契約（NDA）の締結は可能ですか？',
        answer: '開発開始前に必ず秘密保持契約（NDA）を締結いたします。完成したソースコードおよび知的財産権（IP）はお客様に完全帰属いたします。'
      },
      {
        question: '納品後のバグ修正や保守サポート体制はどうなっていますか？',
        answer: '納品後90日間の無償瑕疵保証期間を設けており、その後もSLAに基づく継続的な保守・運用サポートをご提供可能です。'
      }
    ]
  },

  inquiry: {
    badge: 'お問い合わせ',
    heading: '貴社の新規プロジェクトについてお気軽にご相談ください',
    lead: '以下のフォームよりご要望をお送りください。弊社のソリューションチームより具体的なご提案とお見積りをご連絡いたします。',
    nameLabel: 'ご担当者様名 *',
    namePlaceholder: '例：山田 太郎',
    companyLabel: '貴社名 / 組織名',
    companyPlaceholder: '例：株式会社〇〇',
    phoneLabel: 'お電話番号 / WhatsApp *',
    phonePlaceholder: '例：+81 90 1234 5678',
    emailLabel: 'メールアドレス *',
    emailPlaceholder: 'name@company.co.jp',
    serviceLabel: 'ご希望のシステム種別 *',
    captchaLabel: 'セキュリティ計算 *',
    captchaPlaceholder: '答えを入力',
    messageLabel: 'プロジェクトの概要・ご相談内容 *',
    messagePlaceholder: 'ご予算感、納期のご希望、解決したい課題などをご記入ください...',
    submitBtn: 'お問い合わせ内容を送信する',
    submittingBtn: '送信中...',
    directContact: '技術相談窓口',
    phoneSupport: 'お電話 / WhatsApp',
    emailSupport: '公式メール',
    officeLocation: '登録事業所',
    validation: {
      nameRequired: 'お名前をご入力ください（2文字以上）。',
      phoneRequired: 'お電話番号をご入力ください。',
      phoneInvalid: '有効な電話番号の形式でご入力ください。',
      emailRequired: 'メールアドレスをご入力ください。',
      emailInvalid: '有効なメールアドレス形式でご入力ください。',
      messageRequired: 'ご相談内容の詳細をご入力ください（5文字以上）。',
      captchaRequired: 'セキュリティ計算の答えをご入力ください。',
      captchaInvalid: '計算の答えが一致しません。もう一度お試しください。'
    },
    successMessage: 'お問い合わせを正常に送信いたしました。確認メールをお送りしましたのでご確認ください。',
    errorMessage: '送信に失敗いたしました。恐れ入りますが、しばらく時間をおいてお試しいただくかWhatsAppよりご連絡ください。'
  },

  quoteModal: {
    title: '個別お見積り・技術提案のご依頼',
    subtitle: 'ご要件をお聞かせいただければ、2〜4営業時間以内に概算見積りと技術構成案をご案内いたします。',
    closeBtn: '閉じる',
    submitBtn: '依頼を送信する',
    submittingBtn: '送信中...'
  },

  footer: {
    brandBio: 'YOGTECKは、クラウドERP、Webアプリケーション、SaaS開発、ECプラットフォーム等、企業の持続的成長を支援する先進のITソリューションを提供しております。',
    directContactTitle: 'ダイレクト連絡先',
    registeredOfficeTitle: '登記住所',
    specialInclusionBadge: '特典プラン',
    specialInclusionTitle: 'クラウド環境初期設定無料',
    specialInclusionDesc: '対象の開発パッケージをご契約の場合',
    servicesTitle: '開発サービス一覧',
    locationsTitle: '主要開発拠点',
    rightsReserved: 'YOGTECK Business Solution. 無断転載を禁じます。',
    chatLive: 'WhatsAppで相談する'
  },

  common: {
    languageSwitcherTitle: '地域と言語を選択',
    currency: 'JPY',
    openInNewTab: '新しいタブで開く',
    loading: '読み込み中...',
    backToHome: 'トップページへ戻る',
    pageNotFound: '404 - ページが見つかりません',
    pageNotFoundDesc: 'お探しのページは移動したか、存在しない可能性があります。'
  }
};
