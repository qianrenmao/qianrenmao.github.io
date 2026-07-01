(function () {
  "use strict";

  var STORAGE_KEY = "siteLanguage";
  var TARGET_LANG = "zh-CN";
  var DEFAULT_LANG = "en";
  var originalText = new WeakMap();
  var originalAttributes = new WeakMap();

  var exactTranslations = {
    "Homepage": "主页",
    "Publications": "论文",
    "Selected Publications": "代表性论文",
    "Teaching": "教学",
    "Portfolio": "项目",
    "Resources": "资源",
    "CV": "简历",
    "About": "关于我",
    "News": "新闻",
    "Follow": "关注",
    "Website": "网站",
    "Email": "邮箱",
    "Project": "项目",
    "Github": "GitHub",
    "Paper": "论文",
    "ABS": "摘要",
    "BIB": "引用",
    "PDF": "PDF",
    "BLOG": "博客",
    "VIDEO": "视频",
    "CODE": "代码",
    "WEBSITE": "网站",
    "SLIDES": "幻灯片",
    "Download Paper": "下载论文",
    "Download Slides": "下载幻灯片",
    "Download Bibtex": "下载 BibTeX",
    "Recommended citation": "推荐引用",
    "Published in": "发表于",
    "You May Also Enjoy": "你可能也喜欢",
    "Share on": "分享到",
    "Comments": "评论",
    "Leave a Comment": "发表评论",
    "Email address": "邮箱地址",
    "Website (optional)": "网站（可选）",
    "Sitemap": "站点地图",
    "Pages": "页面",
    "Posts": "文章",
    "Blog posts": "博客文章",
    "Posts by Tags": "按标签归档",
    "Posts by Category": "按分类归档",
    "Posts by Collection": "按集合归档",
    "Page Archive": "页面归档",
    "Talks and presentations": "报告与演示",
    "Talk map": "报告地图",
    "Terms and Privacy Policy": "条款与隐私政策",
    "Page Not Found": "页面未找到",
    "Summary": "摘要",
    "Education": "教育经历",
    "Work Experience": "工作经历",
    "Skills": "技能",
    "Presentations": "报告",
    "Languages": "语言",
    "Interests": "兴趣",
    "References": "推荐人",
    "View Publication": "查看论文",
    "View Project": "查看项目",
    "Download CV as PDF": "下载 PDF 简历",
    "View Markdown CV": "查看 Markdown 简历"
  };

  var phraseTranslations = [
    ["I am currently working at Zhongguancun Laboratory (ZGCLAB), leading a research team focused on Data mining, LLM Reasoning, and Agent Reasoning.", "我目前在中关村实验室（ZGCLAB）工作，带领研究团队聚焦数据挖掘、大语言模型推理和智能体推理。"],
    ["I received my Ph.D. from the School of Computer Science and Engineering,", "我博士毕业于"],
    ["under the supervision of Prof.", "师从"],
    ["I completed both my Bachelor's and Master's degrees at China West Normal University and was honored as an", "我在西华师范大学完成本科和硕士学位，并获评"],
    ["My research interests include speech synthesis, neural machine translation, and automatic music generation.", "我的研究兴趣包括语音合成、神经机器翻译和自动音乐生成。"],
    ["I have published more than 50 papers at top international AI conferences such as NeurIPS, ICML, ICLR, and KDD.", "我已在 NeurIPS、ICML、ICLR、KDD 等国际顶级人工智能会议发表 50 余篇论文。"],
    ["I also collaborate closely with Prof.", "我也与"],
    ["from the University of Manchester, and I have a long-term collaboration with Distinguished Prof.", "（曼彻斯特大学）保持密切合作，并与杰出教授"],
    ["from the University of Illinois Chicago.", "（伊利诺伊大学芝加哥分校）保持长期合作。"],
    ["For the most up-to-date citation counts, please visit my", "如需查看最新引用次数，请访问我的"],
    ["Google Scholar profile.", "Google Scholar 主页。"],
    ["You can also find my articles on", "你也可以在"],
    ["my Google Scholar profile", "我的 Google Scholar 主页"],
    ["I was selected to serve as the first member of the Chinese Cyber Security Society", "我入选中国网络空间安全协会"],
    ["for the 2026-2031 term.", "2026-2031 年度首批会员。"],
    ["Our survey \"A Survey on LLM Ensemble\" (100+ citations and 200+ GitHub stars) was accepted by IJCAI 2026.", "我们的综述论文《A Survey on LLM Ensemble》（引用 100+，GitHub 星标 200+）被 IJCAI 2026 接收。"],
    ["A new arXiv preprint,", "一篇新的 arXiv 预印本"],
    ["introduced an unsupervised method to ensemble multiple LLM outputs.", "提出了一种无监督方法，用于集成多个大语言模型的输出。"],
    ["Our survey \"A Survey on LLM Ensemble\" gained 50+ citations and 180+ GitHub stars by late Dec. 2025.", "截至 2025 年 12 月下旬，我们的综述论文《A Survey on LLM Ensemble》获得 50+ 引用和 180+ GitHub 星标。"],
    ["XRAG was accepted to ICDE 2026.", "XRAG 被 ICDE 2026 接收。"],
    ["We released a pioneering modular RAG evaluation benchmark,", "我们发布了一个开创性的模块化 RAG 评测基准："],
    ["Our work on knowledge graph reasoning, KnowFormer, was accepted to ICML 2024.", "我们关于知识图谱推理的工作 KnowFormer 被 ICML 2024 接收。"],
    ["papers were accepted to EMNLP and EMNLP(findings).", "篇论文被 EMNLP 和 EMNLP Findings 接收。"],
    ["Our LiteSSLHub streamlined lightweight PLM fine-tuning across three pillars-few labels, light models, and fast inference-through our research line:", "我们的 LiteSSLHub 围绕少标签、轻量模型和快速推理三大方向，系统化推进轻量级 PLM 微调研究线："],
    ["1st-author papers were accepted to IEEE ACM Trans. Audio Speech Lang. Process, TASLP.", "篇第一作者论文被 IEEE/ACM Transactions on Audio, Speech, and Language Processing（TASLP）接收。"],
    ["1st-author papers were accepted.", "篇第一作者论文被接收。"],
    ["We focused on natural language summarization tasks and launched the OpenSUM open-source project, which later incorporated a series of our developed models, including", "我们聚焦自然语言摘要任务并发起 OpenSUM 开源项目，后续整合了我们开发的一系列模型，包括"],
    ["Led the PhD student cohort within the BUAA ACT BIGDATA RING research group for three years.", "在北航 ACT BIGDATA RING 研究组担任博士生团队负责人三年。"],
    ["Powered by", "技术支持："],
    ["a fork of", "基于"],
    ["toggle theme", "切换主题"],
    ["more authors", "位更多作者"]
  ];

  function normalizeText(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function leadingWhitespace(value) {
    return value.match(/^\s*/)[0];
  }

  function trailingWhitespace(value) {
    return value.match(/\s*$/)[0];
  }

  function translateText(value) {
    var normalized = normalizeText(value);

    if (!normalized) {
      return value;
    }

    if (exactTranslations[normalized]) {
      return leadingWhitespace(value) + exactTranslations[normalized] + trailingWhitespace(value);
    }

    var translated = normalized;
    phraseTranslations.forEach(function (entry) {
      translated = translated.split(entry[0]).join(entry[1]);
    });

    translated = translated.replace(/(\d+)\s+more authors/g, "$1 位更多作者");

    if (translated === normalized) {
      return value;
    }

    return leadingWhitespace(value) + translated + trailingWhitespace(value);
  }

  function shouldSkipElement(element) {
    if (!element || !element.tagName) {
      return false;
    }

    var tagName = element.tagName.toLowerCase();
    return tagName === "script" ||
      tagName === "style" ||
      tagName === "noscript" ||
      tagName === "code" ||
      tagName === "pre" ||
      tagName === "svg" ||
      element.hasAttribute("data-no-translate");
  }

  function walkTextNodes(callback) {
    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (!node.nodeValue || !normalizeText(node.nodeValue)) {
            return NodeFilter.FILTER_REJECT;
          }

          if (shouldSkipElement(node.parentElement)) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    var node = walker.nextNode();
    while (node) {
      callback(node);
      node = walker.nextNode();
    }
  }

  function translateAttributes(element) {
    ["aria-label", "title", "alt", "data-collapsed"].forEach(function (attribute) {
      if (!element.hasAttribute(attribute)) {
        return;
      }

      var value = element.getAttribute(attribute);
      if (!value || !normalizeText(value)) {
        return;
      }

      if (!originalAttributes.has(element)) {
        originalAttributes.set(element, {});
      }

      var attributes = originalAttributes.get(element);
      if (!Object.prototype.hasOwnProperty.call(attributes, attribute)) {
        attributes[attribute] = value;
      }

      element.setAttribute(attribute, translateText(value));
    });
  }

  function restoreAttributes(element) {
    if (!originalAttributes.has(element)) {
      return;
    }

    var attributes = originalAttributes.get(element);
    Object.keys(attributes).forEach(function (attribute) {
      element.setAttribute(attribute, attributes[attribute]);
    });
  }

  function setLanguage(language) {
    var useChinese = language === TARGET_LANG;

    walkTextNodes(function (node) {
      if (!originalText.has(node)) {
        originalText.set(node, node.nodeValue);
      }

      node.nodeValue = useChinese ? translateText(originalText.get(node)) : originalText.get(node);
    });

    document.querySelectorAll("[aria-label], [title], [alt], [data-collapsed]").forEach(function (element) {
      if (shouldSkipElement(element)) {
        return;
      }

      if (useChinese) {
        translateAttributes(element);
      } else {
        restoreAttributes(element);
      }
    });

    document.documentElement.lang = useChinese ? TARGET_LANG : DEFAULT_LANG;
    document.documentElement.classList.toggle("site-lang-zh", useChinese);
    window.localStorage.setItem(STORAGE_KEY, useChinese ? TARGET_LANG : DEFAULT_LANG);
    updateToggle(useChinese);
  }

  function updateToggle(useChinese) {
    var toggle = document.getElementById("language-toggle");
    if (!toggle) {
      return;
    }

    var label = toggle.querySelector("[data-lang-toggle-label]");
    toggle.setAttribute("aria-pressed", useChinese ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      useChinese ? "Switch site language to English" : "Switch site language to Chinese"
    );

    if (label) {
      label.textContent = useChinese ? "English" : "中文";
    }
  }

  function init() {
    var toggle = document.getElementById("language-toggle");
    var storedLanguage = window.localStorage.getItem(STORAGE_KEY);

    if (toggle) {
      toggle.addEventListener("click", function (event) {
        event.preventDefault();
        var nextLanguage = document.documentElement.lang === TARGET_LANG ? DEFAULT_LANG : TARGET_LANG;
        setLanguage(nextLanguage);
      });
    }

    updateToggle(false);

    if (storedLanguage === TARGET_LANG) {
      setLanguage(TARGET_LANG);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
