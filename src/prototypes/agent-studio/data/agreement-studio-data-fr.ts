/**
 * AgreementStudio Mock Data - French Localization
 *
 * All mock data constants for the AgreementStudio prototype (French version).
 * Extracted for better code organization and easier updates.
 */

import type { ChatMessage } from '@/design-system';
import type {
  Agreement,
  ExtendedSuggestedAction,
  ChatHistoryData,
  RichMessageData,
  DocumentPageData,
  ConflictData,
} from './agreement-studio-types';

// =============================================================================
// Acme Demo Data - 15 Realistic Agreements (French)
// =============================================================================

export const ALL_AGREEMENTS: Agreement[] = [
  // Non-Acme agreements (shown before search)
  {
    id: 'other-1',
    agreementId: 'CSP-2023-045',
    fileName: 'TechStart Inc - Contrat de Services Principal',
    fileStatus: 'completed',
    fileStatusDetail: 'Entièrement exécuté',
    parties: ['TechStart Inc', 'DocuSign Inc.'],
    status: 'active',
    agreementType: 'CSP',
    effectiveDate: '01/03/2023',
    expirationDate: '28/02/2026',
    isAIAssisted: false,
  },
  {
    id: 'other-2',
    agreementId: 'ACC-2024-012',
    fileName: 'Global Partners - Accord de Confidentialité',
    fileStatus: 'completed',
    fileStatusDetail: 'Signé',
    parties: ['Global Partners SARL'],
    status: 'active',
    agreementType: 'ACC',
    effectiveDate: '15/01/2024',
    expirationDate: '14/01/2027',
    isAIAssisted: false,
  },
  {
    id: 'other-3',
    agreementId: 'EDT-2024-008',
    fileName: 'Innovate Labs - EDT Phase 2',
    fileStatus: 'completed',
    fileStatusDetail: 'Actif',
    parties: ['Innovate Labs', 'Services Professionnels'],
    status: 'active',
    agreementType: 'EDT',
    contractValue: '275 000,00 € EUR',
    effectiveDate: '01/02/2024',
    expirationDate: '31/07/2024',
    isAIAssisted: true,
  },
  {
    id: 'other-4',
    agreementId: 'CSP-2022-089',
    fileName: 'Summit Group - Contrat Cadre',
    fileStatus: 'completed',
    fileStatusDetail: 'Renouvelé',
    parties: ['Summit Group Holdings'],
    status: 'active',
    agreementType: 'CSP',
    effectiveDate: '01/06/2022',
    expirationDate: '31/05/2025',
    isAIAssisted: false,
  },
  {
    id: 'other-5',
    agreementId: 'BC-2024-033',
    fileName: 'Velocity Corp - Bon de Commande T1',
    fileStatus: 'completed',
    fileStatusDetail: 'Traité',
    parties: ['Velocity Corporation'],
    status: 'active',
    agreementType: 'Bon de Commande',
    contractValue: '450 000,00 € EUR',
    effectiveDate: '01/01/2024',
    expirationDate: '31/12/2024',
    isAIAssisted: false,
  },
  // Acme agreements (shown when user searches "Acme")
  {
    id: '1',
    agreementId: 'CSP-2022-001',
    fileName: 'Acme Corp - Contrat de Services Principal',
    fileStatus: 'completed',
    fileStatusDetail: 'Entièrement exécuté',
    parties: ['Acme Corporation', 'DocuSign Inc.'],
    status: 'active',
    agreementType: 'CSP',
    effectiveDate: '15/01/2022',
    expirationDate: '14/01/2027',
    isAIAssisted: true,
  },
  {
    id: '2',
    agreementId: 'BC-2024-001',
    fileName: 'Acme Corp - Bon de Commande 2024',
    fileStatus: 'completed',
    fileStatusDetail: 'Renouvellement annuel',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'Bon de Commande',
    contractValue: '1 800 000,00 € EUR',
    effectiveDate: '01/01/2024',
    expirationDate: '31/12/2024',
    isAIAssisted: true,
  },
  {
    id: '3',
    agreementId: 'EDT-2024-001',
    fileName: 'Acme Corp - EDT Services de Mise en Œuvre',
    fileStatus: 'completed',
    fileStatusDetail: 'Phase 1 terminée',
    parties: ['Acme Corporation', 'Services Professionnels'],
    status: 'active',
    agreementType: 'EDT',
    contractValue: '450 000,00 € EUR',
    effectiveDate: '15/03/2024',
    expirationDate: '15/09/2024',
    isAIAssisted: true,
  },
  {
    id: '4',
    agreementId: 'AVN-2022-001',
    fileName: 'Acme Corp - Avenant n°1 (Tarification)',
    fileStatus: 'completed',
    fileStatusDetail: 'Ajustement tarifaire',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'Avenant',
    effectiveDate: '01/06/2022',
    isAIAssisted: false,
  },
  {
    id: '5',
    agreementId: 'AVN-2023-001',
    fileName: 'Acme Corp - Avenant n°2 (Prolongation)',
    fileStatus: 'completed',
    fileStatusDetail: 'Durée prolongée',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'Avenant',
    effectiveDate: '15/01/2023',
    isAIAssisted: false,
  },
  {
    id: '6',
    agreementId: 'AVN-2024-001',
    fileName: 'Acme Corp - Avenant n°3 (Mise à jour SLA)',
    fileStatus: 'completed',
    fileStatusDetail: 'Améliorations SLA',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'Avenant',
    effectiveDate: '01/02/2024',
    isAIAssisted: true,
  },
  {
    id: '7',
    agreementId: 'ACC-2022-001',
    fileName: 'Acme Corp - Accord de Confidentialité Mutuel',
    fileStatus: 'completed',
    fileStatusDetail: 'Entièrement exécuté',
    parties: ['Acme Corporation', 'DocuSign Inc.'],
    status: 'active',
    agreementType: 'ACC',
    effectiveDate: '10/01/2022',
    expirationDate: '09/01/2025',
    isAIAssisted: false,
  },
  {
    id: '8',
    agreementId: 'ATD-2022-001',
    fileName: 'Acme Corp - Accord de Traitement des Données',
    fileStatus: 'completed',
    fileStatusDetail: 'Conforme RGPD',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'ATD',
    effectiveDate: '15/01/2022',
    isAIAssisted: true,
  },
  {
    id: '9',
    agreementId: 'BC-2023-001',
    fileName: 'Acme Corp - Bon de Commande 2023',
    fileStatus: 'completed',
    fileStatusDetail: 'Remplacé par 2024',
    parties: ['Acme Corporation'],
    status: 'inactive',
    statusDate: 'Remplacé 31/12/2023',
    agreementType: 'Bon de Commande',
    contractValue: '1 500 000,00 € EUR',
    effectiveDate: '01/01/2023',
    expirationDate: '31/12/2023',
    isAIAssisted: false,
  },
  {
    id: '10',
    agreementId: 'EDT-2023-001',
    fileName: 'Acme Corp - EDT Services de Conseil',
    fileStatus: 'completed',
    fileStatusDetail: 'Terminé',
    parties: ['Acme Corporation', 'Équipe Conseil'],
    status: 'inactive',
    statusDate: 'Terminé 15/12/2023',
    agreementType: 'EDT',
    contractValue: '275 000,00 € EUR',
    effectiveDate: '01/06/2023',
    expirationDate: '15/12/2023',
    isAIAssisted: true,
  },
  {
    id: '11',
    agreementId: 'SLA-2024-001',
    fileName: 'Acme Corp - Accord de Niveau de Service',
    fileStatus: 'completed',
    fileStatusDetail: 'SLA amélioré',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'SLA',
    effectiveDate: '01/02/2024',
    isAIAssisted: true,
  },
  {
    id: '12',
    agreementId: 'BAA-2022-001',
    fileName: 'Acme Corp - Accord de Partenariat Commercial',
    fileStatus: 'completed',
    fileStatusDetail: 'Conforme HIPAA',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'APC',
    effectiveDate: '15/01/2022',
    isAIAssisted: false,
  },
  {
    id: '13',
    agreementId: 'BC-2022-001',
    fileName: 'Acme Corp - Bon de Commande 2022',
    fileStatus: 'completed',
    fileStatusDetail: 'Commande initiale',
    parties: ['Acme Corporation'],
    status: 'inactive',
    statusDate: 'Remplacé 31/12/2022',
    agreementType: 'Bon de Commande',
    contractValue: '1 200 000,00 € EUR',
    effectiveDate: '15/01/2022',
    expirationDate: '31/12/2022',
    isAIAssisted: false,
  },
  {
    id: '14',
    agreementId: 'SEC-2024-001',
    fileName: 'Acme Corp - Annexe de Sécurité',
    fileStatus: 'completed',
    fileStatusDetail: 'Exigences SOC2',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'Annexe',
    effectiveDate: '01/03/2024',
    isAIAssisted: true,
  },
  {
    id: '15',
    agreementId: 'ASS-2024-001',
    fileName: "Acme Corp - Certificat d'Assurance",
    fileStatus: 'uploaded',
    fileStatusDetail: 'Renouvellement annuel',
    parties: ['Acme Corporation', "Fournisseur d'Assurance"],
    status: 'active',
    agreementType: 'Certificat',
    effectiveDate: '01/01/2024',
    expirationDate: '31/12/2024',
    isAIAssisted: false,
  },
];

// =============================================================================
// Domain-Specific Prompts for Contract Analysis (French)
// =============================================================================

export const QUICK_ACTIONS: ExtendedSuggestedAction[] = [
  {
    label: 'Résumer les Termes en Vigueur',
    description: 'Analyser tous les contrats pour identifier les termes actuels',
    icon: 'document-stack',
    expansion: {
      steps: [
        'Analyser les 15 contrats pour établir un inventaire complet des termes, en commençant par le Contrat de Services Principal comme document de référence',
        'Pour chaque catégorie de termes clés (tarification, paiement, responsabilité, indemnisation, PI, résiliation, renouvellement, SLA), identifier chaque instance où ce terme apparaît dans tous les documents',
        "Construire une chronologie des avenants et modifications, en notant les dates d'effet et les sections spécifiques qui ont été remplacées",
        "Appliquer l'ordre de préséance contractuel (Avenants > EDT > Bons de Commande > CSP) pour déterminer quelle version de chaque terme régit actuellement la relation",
        "Croiser les Bons de Commande de 2022, 2023 et 2024 pour suivre l'évolution des prix, les engagements de volume et les exceptions négociées",
        "Extraire toutes les modifications SLA de l'Avenant n°3, comparant le temps de disponibilité initial de 99,5% à la garantie actuelle de 99,9% avec les crédits de service correspondants",
        'Identifier les termes qui ont été explicitement renoncés, modifiés ou prolongés par des lettres annexes ou confirmations par email référencées dans les contrats',
        'Compiler les résultats en trois catégories : Termes Financiers (prix, minimums, paiement), Risques et Responsabilités (plafonds, indemnisation, assurance), et Termes Opérationnels (SLA, support, résiliation)',
        "Pour chaque constatation, fournir des citations exactes incluant l'ID du contrat, le numéro de section, la référence de page et l'extrait pertinent pour vérification",
        'Signaler toute disposition ambiguë ou potentiellement contradictoire nécessitant une révision juridique avant la négociation de renouvellement',
      ],
      estimatedTime: '~30 secondes',
      documentsToAnalyze: 15,
    },
  },
  {
    label: 'Analyser les Termes Financiers',
    description: 'Extraire les prix, conditions de paiement et valeurs contractuelles',
    icon: 'currency-dollar',
    expansion: {
      steps: [
        'Extraire le barème tarifaire complet du Bon de Commande 2024 actuel, incluant le prix unitaire de base (150€/unité), les structures de tarification par paliers et les seuils de remise sur volume',
        "Comparer les tarifs d'une année sur l'autre à travers les Bons de Commande 2022 (1,2M€), 2023 (1,5M€) et 2024 (1,8M€) pour calculer le taux de croissance annuel et identifier les tendances tarifaires",
        'Identifier tous les paliers de remise sur volume et calculer la remise effective aux niveaux de consommation actuels et projetés (5% à 10K unités, 10% à 25K, 15% à 50K+)',
        "Localiser et analyser la clause d'engagement minimum annuel dans le CSP §4.2, incluant les pénalités de non-atteinte et la méthodologie de calcul de régularisation",
        "Examiner les conditions de paiement incluant les termes de facturation à 30 jours, les taux d'intérêt de retard (1,5%/mois), les méthodes de paiement acceptées et toute provision d'escompte pour paiement anticipé",
        'Calculer la valeur contractuelle totale à travers tous les contrats actifs incluant les frais de base, les services professionnels (EDT: 450K€) et les frais de mise en œuvre ponctuels',
        "Identifier les clauses de protection tarifaire, les plafonds d'ajustement IPC et toute disposition de client le plus favorisé pouvant affecter la tarification du renouvellement",
        'Extraire toutes les spécifications de devise, assurant la cohérence de la dénomination EUR et notant toute provision de change pour les opérations internationales',
        "Documenter la fréquence de facturation (mensuelle à terme échu), les délais de contestation de facture (15 jours) et les termes d'escalade tarifaire automatique au renouvellement",
        "Résumer la trajectoire historique des dépenses et projeter les coûts de l'Année 5 basés sur le taux de croissance actuel et les provisions d'escalade contractuelles",
        'Signaler les termes financiers qui dévient des conditions commerciales standard et peuvent présenter des opportunités de renégociation',
      ],
      estimatedTime: '~25 secondes',
      documentsToAnalyze: 15,
    },
  },
  {
    label: 'Examiner Risques et Responsabilités',
    description: 'Identifier les plafonds de responsabilité, indemnisation et PI',
    icon: 'shield',
    expansion: {
      steps: [
        "Localiser le plafond de responsabilité global dans le CSP §8.1 (2M€) et documenter toutes les exclusions incluant les violations de confidentialité, les obligations d'indemnisation et la faute lourde/intentionnelle",
        "Analyser les dispositions d'indemnisation mutuelle dans le CSP §9, spécifiquement la couverture pour les réclamations de tiers découlant de violation, d'infractions légales et de négligence",
        'Examiner les termes de propriété intellectuelle à travers tous les documents : CSP §7.1 (propriété du Prestataire avec licence au Client) vs EDT §5.3 (propriété Client des travaux personnalisés) et identifier la disposition applicable',
        "Extraire les exigences d'assurance du CSP et vérifier la conformité via le Certificat d'Assurance INS-2024-001, incluant les types de couverture et les montants minimums",
        'Identifier les obligations de protection des données dans le ATPD-2022-001 incluant les exigences de conformité RGPD, les limitations de traitement des données et les délais de notification de violation',
        'Examiner les exclusions de limitation de responsabilité pour les réclamations de contrefaçon de PI, déterminant si elles sont plafonnées séparément ou relèvent du plafond global',
        'Analyser la portée de la renonciation aux dommages indirects et toute exception pour faute intentionnelle, fraude ou violations des obligations de confidentialité',
        "Documenter les exigences d'assurance incluant la Responsabilité Civile Générale, la Responsabilité Professionnelle et les couvertures minimums de Cyber-Responsabilité",
        'Examiner les dispositions de confidentialité incluant la définition des Informations Confidentielles, les divulgations permises et la période de survie post-résiliation',
        "Identifier tout scénario de responsabilité illimitée (ex: indemnisation PI, violation de données, faute intentionnelle) pouvant exposer l'une des parties à un risque significatif",
        "Croiser l'Addendum de Sécurité (SEC-2024-001) avec les exigences SOC2 et évaluer les obligations de conformité et les droits d'audit",
        "Fournir une matrice de synthèse des risques catégorisant les expositions comme Faible/Moyen/Élevé avec des recommandations spécifiques d'atténuation pour les discussions de renouvellement",
      ],
      estimatedTime: '~35 secondes',
      documentsToAnalyze: 15,
    },
  },
  {
    label: 'Vérifier les Conflits',
    description: 'Trouver les termes contradictoires entre les contrats',
    icon: 'status-warn',
    expansion: {
      steps: [
        "Établir la hiérarchie contractuelle en localisant la clause d'Ordre de Préséance (typiquement CSP §2.1) qui régit la résolution des conflits entre Avenants, EDT, Bons de Commande et le CSP",
        "Comparer systématiquement les dispositions de propriété intellectuelle : le CSP §7.1 accorde la propriété au Prestataire avec licence au Client, tandis que l'EDT §5.3 attribue les travaux personnalisés au Client - déterminer lequel prévaut selon les règles de préséance",
        "Identifier le conflit sur le délai de préavis de résiliation : le CSP §12.2 exige 90 jours de préavis, mais l'Avenant n°2 §4 l'a modifié à 120 jours - confirmer que l'Avenant remplace la disposition originale du CSP",
        'Examiner les dispositions de plafond de responsabilité à travers tous les documents pour assurer la cohérence et identifier tout plafond spécifique au contrat pouvant entrer en conflit avec la limite globale du CSP',
        "Analyser les conditions de paiement pour détecter les incohérences : confirmer que le paiement à 30 jours est cohérent entre le CSP et les Bons de Commande, et vérifier qu'il n'existe pas de dispositions contradictoires de paiement anticipé ou de pénalités de retard",
        "Comparer les engagements SLA entre le CSP original (99,5% de disponibilité) et l'Avenant n°3 (99,9% de disponibilité) et vérifier que les calculs de crédits de service sont alignés",
        'Vérifier les dispositions contradictoires de droit applicable et de juridiction à travers les contrats, particulièrement si les EDT référencent des tribunaux différents du CSP',
        'Identifier toute garantie pouvant entrer en conflit entre la clause de non-garantie générale du CSP et les garanties spécifiques de livrables des EDT',
        "Examiner les dispositions de renouvellement et reconduction automatique pour assurer la cohérence - vérifier qu'il n'existe pas de délais de préavis ou mécanismes d'ajustement tarifaire contradictoires",
        'Documenter chaque conflit identifié avec : (1) les références de clauses spécifiques des deux documents, (2) la nature du conflit, (3) quel document prévaut selon la hiérarchie, (4) le terme applicable résultant',
        "Pour les conflits ou ambiguïtés non résolubles, fournir des recommandations spécifiques de clarification dans l'avenant de renouvellement",
        'Générer une matrice de résolution des conflits montrant chaque conflit, les dispositions affectées, la justification de résolution et les actions recommandées pour révision juridique',
      ],
      estimatedTime: '~40 secondes',
      documentsToAnalyze: 15,
    },
  },
];

export const SUGGESTED_QUESTIONS = [
  'Quel est le prix unitaire actuel pour Acme ?',
  'Quand expire le contrat Acme ?',
  'Y a-t-il des termes contradictoires entre les contrats ?',
];

// =============================================================================
// Chat History - Named Conversations (French)
// =============================================================================

export const CHAT_HISTORY: ChatHistoryData = {
  today: [{ id: '1', title: 'Préparation Renouvellement Acme', time: '14h30', messages: 8 }],
  yesterday: [
    { id: '2', title: 'Revue Contrats T4', time: '16h45', messages: 12 },
    { id: '3', title: 'Vérification Conformité Fournisseurs', time: '10h00', messages: 6 },
  ],
  lastWeek: [
    { id: '4', title: 'Analyse Tarifaire Annuelle', time: 'Lun', messages: 15 },
    { id: '5', title: 'Rapport Comparatif SLA', time: 'Ven', messages: 9 },
  ],
};

// Stored conversations for history - pre-loaded messages for each named conversation
export const STORED_CONVERSATIONS: Record<string, ChatMessage[]> = {
  '1': [], // Current session - starts empty for demo
  '2': [
    {
      id: 'stored-2-1',
      role: 'user',
      content: 'Examiner tous les contrats T4 pour le statut de renouvellement',
      timestamp: new Date('2024-01-12T16:30:00'),
    },
    {
      id: 'stored-2-2',
      role: 'assistant',
      content:
        "J'ai trouvé 23 contrats avec des dates de renouvellement au T4. 15 sont en renouvellement automatique, 5 nécessitent une renégociation, et 3 ont des avis de résiliation en attente.",
      timestamp: new Date('2024-01-12T16:31:00'),
    },
  ],
  '3': [
    {
      id: 'stored-3-1',
      role: 'user',
      content: 'Vérifier le statut de conformité des fournisseurs',
      timestamp: new Date('2024-01-12T10:00:00'),
    },
    {
      id: 'stored-3-2',
      role: 'assistant',
      content:
        'Les 8 fournisseurs actifs sont actuellement conformes. 2 certifications expirent dans les 30 jours et nécessiteront une vérification de renouvellement.',
      timestamp: new Date('2024-01-12T10:01:00'),
    },
  ],
  '4': [
    {
      id: 'stored-4-1',
      role: 'user',
      content: 'Analyser les changements de prix sur tous les contrats',
      timestamp: new Date('2024-01-08T14:00:00'),
    },
    {
      id: 'stored-4-2',
      role: 'assistant',
      content:
        'Analyse tarifaire annuelle terminée. Augmentation moyenne des prix : 4,2%. 3 contrats ont des clauses de protection tarifaire. Dépense annuelle totale : 4,2M€.',
      timestamp: new Date('2024-01-08T14:02:00'),
    },
  ],
  '5': [
    {
      id: 'stored-5-1',
      role: 'user',
      content: 'Comparer les termes SLA entre les fournisseurs cloud',
      timestamp: new Date('2024-01-05T11:00:00'),
    },
    {
      id: 'stored-5-2',
      role: 'assistant',
      content:
        'Comparaison SLA sur 4 fournisseurs cloud : Les garanties de disponibilité varient de 99,9% à 99,99%. Les temps de réponse varient de 15 min à 4 heures pour les incidents P1.',
      timestamp: new Date('2024-01-05T11:03:00'),
    },
  ],
};

// =============================================================================
// Scripted AI Responses - Pre-built responses for demo scenarios (French)
// =============================================================================

export const SCRIPTED_RESPONSES: Record<string, RichMessageData> = {
  'Résumer les Termes en Vigueur': {
    id: 'prevailing-terms-analysis',
    title: 'ANALYSE DES TERMES EN VIGUEUR',
    subtitle: 'Basé sur 15 contrats Acme',
    sections: [
      {
        id: 'financials',
        title: 'FINANCES',
        icon: 'currency-dollar',
        type: 'table',
        content: {
          headers: ['Terme', 'Valeur', 'Source'],
          rows: [
            {
              cells: [
                'Prix Unitaire',
                '150€/unité',
                {
                  text: 'Bon de Commande 2024',
                  citation: {
                    id: 'cit-1',
                    documentId: '2',
                    documentTitle: 'Acme Corp - Bon de Commande 2024',
                    section: '§3.1 Tarification',
                    excerpt:
                      "Le prix unitaire sera de Cent Cinquante Euros (150,00€) par unité, incluant le support et la maintenance standards. Des remises sur volume s'appliquent pour les commandes dépassant 10 000 unités par trimestre.",
                  },
                },
              ],
            },
            {
              cells: [
                'Minimum Annuel',
                '500K€',
                {
                  text: 'CSP §4.2',
                  citation: {
                    id: 'cit-2',
                    documentId: '1',
                    documentTitle: 'Acme Corp - Contrat de Services Principal',
                    section: '§4.2 Engagement Minimum',
                    excerpt:
                      "Le Client s'engage à une dépense annuelle minimum de Cinq Cent Mille Euros (500 000,00€ EUR) pendant chaque Année Contractuelle, calculée de manière cumulative sur l'ensemble des Bons de Commande.",
                  },
                },
              ],
            },
            {
              cells: [
                'Conditions de Paiement',
                'Net 30',
                {
                  text: 'Bon de Commande 2024',
                  citation: {
                    id: 'cit-3',
                    documentId: '2',
                    documentTitle: 'Acme Corp - Bon de Commande 2024',
                    section: '§5.1 Paiement',
                    excerpt:
                      'Toutes les factures sont dues et payables dans les trente (30) jours suivant la date de facture (Net 30). Les paiements en retard porteront intérêt à 1,5% par mois ou au taux maximum autorisé par la loi.',
                  },
                },
              ],
            },
          ],
        },
      },
      {
        id: 'risk-liability',
        title: 'RISQUES ET RESPONSABILITÉS',
        icon: 'shield',
        type: 'list',
        content: [
          {
            text: 'Plafond Global : 2M€',
            citation: {
              id: 'cit-4',
              documentId: '1',
              documentTitle: 'Acme Corp - Contrat de Services Principal',
              section: '§8.1 Limitation de Responsabilité',
              excerpt:
                "EN AUCUN CAS LA RESPONSABILITÉ GLOBALE DE L'UNE OU L'AUTRE PARTIE NE DÉPASSERA DEUX MILLIONS D'EUROS (2 000 000,00€ EUR), SAUF EN CAS DE VIOLATION DE LA CONFIDENTIALITÉ OU D'OBLIGATIONS D'INDEMNISATION.",
            },
          },
          {
            text: 'Indemnisation : Mutuelle',
            citation: {
              id: 'cit-5',
              documentId: '1',
              documentTitle: 'Acme Corp - Contrat de Services Principal',
              section: '§9 Indemnisation',
              excerpt:
                "Chaque partie indemnisera, défendra et dégagera l'autre partie de toute responsabilité pour les réclamations de tiers résultant de (a) la violation du présent Contrat, (b) la violation de la loi applicable, ou (c) la négligence grave ou la faute intentionnelle.",
            },
          },
          {
            text: 'Propriété Intellectuelle : Conservée par le Client',
            citation: {
              id: 'cit-6',
              documentId: '3',
              documentTitle: 'Acme Corp - EDT Services de Mise en Œuvre',
              section: '§5 Propriété Intellectuelle',
              excerpt:
                'Toutes les Données Client et la PI préexistante du Client resteront la propriété exclusive du Client. Tout développement personnalisé créé spécifiquement pour le Client dans le cadre de cet EDT sera cédé au Client après paiement complet.',
            },
          },
        ],
      },
      {
        id: 'key-changes',
        title: 'MODIFICATIONS CLÉS (2024)',
        icon: 'history',
        type: 'list',
        content: [
          {
            text: 'Disponibilité SLA : 99,5% → 99,9%',
            citation: {
              id: 'cit-7',
              documentId: '6',
              documentTitle: 'Acme Corp - Avenant n°3 (Mise à jour SLA)',
              section: '§2 Modifications du Niveau de Service',
              excerpt:
                "L'Article 6.1 du CSP est par la présente modifié pour augmenter la disponibilité garantie de quatre-vingt-dix-neuf virgule cinq pour cent (99,5%) à quatre-vingt-dix-neuf virgule neuf pour cent (99,9%), avec les crédits de service correspondants.",
            },
          },
          {
            text: 'Heures de Support : 8x5 → 24x7',
            citation: {
              id: 'cit-8',
              documentId: '6',
              documentTitle: 'Acme Corp - Avenant n°3 (Mise à jour SLA)',
              section: '§3 Amélioration du Support',
              excerpt:
                'La couverture de support standard est améliorée des heures ouvrables (8h-17h, Lundi-Vendredi) à vingt-quatre heures par jour, sept jours sur sept (24x7) sans frais supplémentaires, à compter du 1er février 2024.',
            },
          },
        ],
      },
    ],
  },
};

// =============================================================================
// Document Page Data for Citation Viewer (PDF-like mock pages) - French
// =============================================================================

export const DOCUMENT_PAGES: Record<string, DocumentPageData> = {
  'cit-1': {
    pageNumber: 3,
    totalPages: 12,
    sectionTitle: '3. TARIFICATION ET PAIEMENT',
    beforeText: `3.1 Prix Unitaire

Les prix suivants s'appliqueront à tous les Produits et Services commandés dans le cadre de ce Bon de Commande pendant la Durée :`,
    highlightedText: `Le prix unitaire sera de Cent Cinquante Euros (150,00€) par unité, incluant le support et la maintenance standards. Des remises sur volume s'appliquent pour les commandes dépassant 10 000 unités par trimestre.`,
    afterText: `3.2 Remises sur Volume

Le barème de remises sur volume suivant s'applique :
• 10 000 - 24 999 unités : 5% de remise
• 25 000 - 49 999 unités : 10% de remise
• 50 000+ unités : 15% de remise

La structure tarifaire décrite dans ce Bon de Commande remplace tous les arrangements tarifaires antérieurs. La tarification est sujette à révision et ajustement annuels avec un préavis écrit de 90 jours.`,
  },
  'cit-2': {
    pageNumber: 4,
    totalPages: 18,
    sectionTitle: '4. ENGAGEMENT MINIMUM',
    beforeText: `4.1 Engagement Annuel

Pendant chaque Année Contractuelle, le Client s'engage à maintenir les obligations d'achat minimum suivantes :`,
    highlightedText: `Le Client s'engage à une dépense annuelle minimum de Cinq Cent Mille Euros (500 000,00€ EUR) pendant chaque Année Contractuelle, calculée de manière cumulative sur l'ensemble des Bons de Commande.`,
    afterText: `4.2 Insuffisance

Dans le cas où le Client ne respecterait pas l'engagement de dépense annuelle minimum, le Fournisseur peut facturer au Client la différence entre la dépense réelle et l'engagement minimum à la fin de l'Année Contractuelle applicable.

Cet engagement minimum assure une prévision de revenus prévisible et permet au Fournisseur d'allouer des ressources dédiées au compte du Client.`,
  },
  'cit-3': {
    pageNumber: 5,
    totalPages: 12,
    sectionTitle: '5. CONDITIONS DE PAIEMENT',
    beforeText: `5.1 Facturation

Le Fournisseur facturera le Client mensuellement à terme échu pour tous les Produits et Services consommés pendant le mois précédent.`,
    highlightedText: `Toutes les factures sont dues et payables dans les trente (30) jours suivant la date de facture (Net 30). Les paiements en retard porteront intérêt à 1,5% par mois ou au taux maximum autorisé par la loi.`,
    afterText: `5.2 Modes de Paiement

Le paiement électronique par virement bancaire est préféré. Les paiements par carte de crédit sont soumis à des frais de traitement de 3%.

5.3 Factures Contestées

Le Client doit notifier le Fournisseur de toute contestation de facture dans les quinze (15) jours suivant la réception.`,
  },
  'cit-4': {
    pageNumber: 8,
    totalPages: 18,
    sectionTitle: '8. LIMITATION DE RESPONSABILITÉ',
    beforeText: `8.1 Plafond Global

SAUF DISPOSITION CONTRAIRE À L'ARTICLE 8.2 (EXCLUSIONS) :`,
    highlightedText: `EN AUCUN CAS LA RESPONSABILITÉ GLOBALE DE L'UNE OU L'AUTRE PARTIE NE DÉPASSERA DEUX MILLIONS D'EUROS (2 000 000,00€ EUR), SAUF EN CAS DE VIOLATION DE LA CONFIDENTIALITÉ OU D'OBLIGATIONS D'INDEMNISATION.`,
    afterText: `8.2 Exclusions

Les limitations énoncées à l'Article 8.1 ne s'appliqueront pas :
(a) Aux violations des obligations de confidentialité en vertu de l'Article 7 ;
(b) Aux obligations d'indemnisation en vertu de l'Article 9 ;
(c) À la faute intentionnelle ou à la négligence grave.

Cette limitation s'applique à toutes les réclamations dans leur ensemble, qu'elles soient contractuelles, délictuelles ou autres, et survit à la résiliation du présent Contrat.`,
  },
  'cit-5': {
    pageNumber: 9,
    totalPages: 18,
    sectionTitle: '9. INDEMNISATION',
    beforeText: `9.1 Indemnisation Mutuelle

Sous réserve des termes et conditions du présent Contrat :`,
    highlightedText: `Chaque partie indemnisera, défendra et dégagera l'autre partie de toute responsabilité pour les réclamations de tiers résultant de (a) la violation du présent Contrat, (b) la violation de la loi applicable, ou (c) la négligence grave ou la faute intentionnelle.`,
    afterText: `9.2 Procédures d'Indemnisation

La partie indemnisée devra :
(a) Notifier rapidement la partie indemnisante de toute réclamation ;
(b) Accorder le contrôle exclusif de la défense à la partie indemnisante ;
(c) Fournir une coopération et une assistance raisonnables.

Les obligations d'indemnisation sont soumises à une notification rapide, au contrôle exclusif de la défense et à une coopération raisonnable entre les parties.`,
  },
  'cit-6': {
    pageNumber: 5,
    totalPages: 8,
    sectionTitle: '5. PROPRIÉTÉ INTELLECTUELLE',
    beforeText: `5.1 Propriété du Client

Les Données Client et toute la propriété intellectuelle préexistante du Client resteront la propriété exclusive du Client en tout temps.

5.2 Livrables`,
    highlightedText: `Toutes les Données Client et la PI préexistante du Client resteront la propriété exclusive du Client. Tout développement personnalisé créé spécifiquement pour le Client dans le cadre de cet EDT sera cédé au Client après paiement complet.`,
    afterText: `5.3 Propriété du Fournisseur

Le Fournisseur conserve la propriété de toute PI préexistante, outils, méthodologies et connaissances générales qui ne sont pas spécifiques à la mise en œuvre du Client.

5.4 Concession de Licence

Le Fournisseur accorde au Client une licence perpétuelle, non exclusive pour utiliser toute PI du Fournisseur intégrée dans les Livrables.`,
  },
  'cit-7': {
    pageNumber: 2,
    totalPages: 4,
    sectionTitle: '2. MODIFICATIONS DU NIVEAU DE SERVICE',
    beforeText: `2.1 Garantie de Disponibilité

À compter de la Date d'Effet de l'Avenant, l'Article 6.1 du CSP est modifié comme suit :`,
    highlightedText: `L'Article 6.1 du CSP est par la présente modifié pour augmenter la disponibilité garantie de quatre-vingt-dix-neuf virgule cinq pour cent (99,5%) à quatre-vingt-dix-neuf virgule neuf pour cent (99,9%), avec les crédits de service correspondants.`,
    afterText: `2.2 Crédits de Service

Le barème de crédits de service suivant s'applique :
• 99,9% - 99,5% : crédit de 10%
• 99,5% - 99,0% : crédit de 25%
• En dessous de 99,0% : crédit de 50%

La disponibilité est mesurée mensuellement et exclut les fenêtres de maintenance planifiées et les événements de force majeure.`,
  },
  'cit-8': {
    pageNumber: 3,
    totalPages: 4,
    sectionTitle: '3. AMÉLIORATION DU SUPPORT',
    beforeText: `3.1 Heures de Support

À compter de la Date d'Effet de l'Avenant, la couverture de support est améliorée comme suit :`,
    highlightedText: `La couverture de support standard est améliorée des heures ouvrables (8h-17h, Lundi-Vendredi) à vingt-quatre heures par jour, sept jours sur sept (24x7) sans frais supplémentaires, à compter du 1er février 2024.`,
    afterText: `3.2 Temps de Réponse

Les temps de réponse prioritaires restent inchangés :
• Critique (P1) : 1 heure
• Élevé (P2) : 4 heures
• Normal (P3) : 8 heures
• Faible (P4) : 24 heures

3.3 Canaux de Support

Le support est accessible par téléphone, e-mail ou le portail de support en ligne.`,
  },
};

// =============================================================================
// Conflict Detection Data - Pre-built conflict responses (French)
// =============================================================================

export const CONFLICT_RESPONSES: Record<string, ConflictData[]> = {
  'Vérifier les Conflits': [
    {
      id: 'conflict-ip-ownership',
      title: 'Propriété Intellectuelle',
      description:
        "Termes contradictoires de propriété intellectuelle trouvés entre le CSP et l'EDT",
      clauses: [
        {
          documentId: '1',
          documentTitle: 'CSP §7.1',
          section: 'Droits de Propriété Intellectuelle',
          text: '"Toute Propriété Intellectuelle créée, développée ou découverte par le Fournisseur dans le cadre de l\'exécution des Services sera la propriété exclusive du Fournisseur, le Client recevant une licence perpétuelle, non exclusive pour utiliser cette PI..."',
        },
        {
          documentId: '3',
          documentTitle: 'EDT 2024 §5.3',
          section: 'Propriété des Livrables',
          text: '"Le Client conservera la propriété exclusive de tous les Livrables, y compris tout développement personnalisé, intégrations ou livrables créés spécifiquement pour le Client dans le cadre de ce Énoncé de Travail..."',
        },
      ],
      recommendation: "L'EDT prévaut conformément au CSP §2.1 (Ordre de Préséance)",
      recommendationCitation: {
        id: 'cit-conflict-1',
        documentId: '1',
        documentTitle: 'Acme Corp - Contrat de Services Principal',
        section: '§2.1 Ordre de Préséance',
        excerpt:
          "En cas de conflit entre les documents, l'ordre de préséance suivant s'applique : (1) Avenants, par ordre chronologique inverse ; (2) Énoncés de Travail ; (3) Bons de Commande ; (4) le présent Contrat de Services Principal.",
      },
    },
    {
      id: 'conflict-termination',
      title: 'Délai de Préavis de Résiliation',
      description: "Exigences différentes de préavis de résiliation dans le CSP vs l'Avenant",
      clauses: [
        {
          documentId: '1',
          documentTitle: 'CSP §12.2',
          section: 'Résiliation pour Convenance',
          text: "\"L'une ou l'autre partie peut résilier le présent Contrat pour convenance moyennant un préavis écrit de quatre-vingt-dix (90) jours à l'autre partie...\"",
        },
        {
          documentId: '5',
          documentTitle: 'Avenant n°2 §4',
          section: 'Résiliation Modifiée',
          text: '"L\'Article 12.2 est par la présente modifié pour exiger un préavis écrit de cent vingt (120) jours pour la résiliation pour convenance..."',
        },
      ],
      recommendation: "L'Avenant n°2 remplace le CSP - préavis de 120 jours requis",
      recommendationCitation: {
        id: 'cit-conflict-2',
        documentId: '5',
        documentTitle: 'Acme Corp - Avenant n°2',
        section: "§1 Effet de l'Avenant",
        excerpt:
          'Le présent Avenant modifie et complète le Contrat de Services Principal daté du 15 janvier 2022. En cas de conflit, le présent Avenant prévaudra.',
      },
    },
  ],
};
