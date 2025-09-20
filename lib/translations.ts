export const translations = {
  en: {
    nav: {
      start: "Start",
      plugins: "Plugins",
      libraries: "Libraries",
      events: "Events",
      rewards: "Rewards",
      about: "About",
      documentation: "Documentation",
      git: "Git",
      learn: "Learn",
    },
    hero: {
      title: "Professional Arbitrum Development Platform",
      subtitle:
        "Enterprise-grade IDE for building scalable dApps on Arbitrum. Complete toolchain with advanced debugging, security analysis, and seamless L2 deployment capabilities.",
      getStarted: "Start Building",
      learnMore: "View Documentation",
    },
    plugins: {
      title: "Professional Plugin Ecosystem",
      subtitle:
        "Comprehensive plugin architecture designed for enterprise development. Core plugins provide essential Arbitrum functionality, while extended plugins offer specialized tools for advanced use cases.",
      featured: "Core Development Tools",
    },
    libraries: {
      title: "Arbitrum Smart Contract Libraries",
      subtitle: "Production-ready, audited smart contract libraries optimized for Arbitrum's Layer 2 architecture",
    },
    events: {
      title: "Developer Events & Training",
      subtitle: "Professional workshops, certification programs, and enterprise training for Arbitrum development",
    },
    rewards: {
      title: "Developer Incentive Program",
      subtitle: "Earn rewards for contributing to the Arbitrum ecosystem and building innovative solutions",
    },
    team: {
      title: "Our Team",
      subtitle: "Meet the passionate developers building the future of blockchain development",
    },
  },
  es: {
    nav: {
      start: "Inicio",
      plugins: "Plugins",
      libraries: "Bibliotecas",
      events: "Eventos",
      rewards: "Recompensas",
      about: "Acerca de",
      documentation: "Documentación",
      git: "Git",
      learn: "Aprender",
    },
    hero: {
      title: "Plataforma Profesional de Desarrollo Arbitrum",
      subtitle:
        "IDE de nivel empresarial para construir dApps escalables en Arbitrum. Cadena de herramientas completa con depuración avanzada, análisis de seguridad y capacidades de implementación L2 sin problemas.",
      getStarted: "Comenzar a Construir",
      learnMore: "Ver Documentación",
    },
    plugins: {
      title: "Ecosistema de Plugins Profesional",
      subtitle:
        "Arquitectura de plugins integral diseñada para desarrollo empresarial. Los plugins principales proporcionan funcionalidad esencial de Arbitrum, mientras que los plugins extendidos ofrecen herramientas especializadas para casos de uso avanzados.",
      featured: "Herramientas de Desarrollo Principal",
    },
    libraries: {
      title: "Bibliotecas de Contratos Inteligentes Arbitrum",
      subtitle:
        "Bibliotecas de contratos inteligentes listas para producción, auditadas y optimizadas para la arquitectura Layer 2 de Arbitrum",
    },
    events: {
      title: "Eventos y Capacitación para Desarrolladores",
      subtitle:
        "Talleres profesionales, programas de certificación y capacitación empresarial para desarrollo en Arbitrum",
    },
    rewards: {
      title: "Programa de Incentivos para Desarrolladores",
      subtitle: "Gana recompensas por contribuir al ecosistema Arbitrum y construir soluciones innovadoras",
    },
    team: {
      title: "Nuestro Equipo",
      subtitle: "Conoce a los desarrolladores apasionados construyendo el futuro del desarrollo blockchain",
    },
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en
