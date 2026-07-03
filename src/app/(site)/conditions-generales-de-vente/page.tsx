// src/app/(site)/conditions-generales-de-vente/page.tsx

import type { Metadata } from "next";

import LegalPage from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Conditions générales de vente | Koa'lit",
  description: "Conditions générales de vente du site KOALIT.",
};

export default function ConditionsGeneralesDeVentePage() {
  return (
    <LegalPage
      eyebrow="Conditions de vente"
      title="Conditions générales de vente"
      sections={[
        {
          heading: "1. Conditions d'utilisation de la boutique en ligne",
          blocks: [
            {
              type: "list",
              items: [
                "Vous certifiez être majeur ou avoir l'autorisation d'un responsable légal pour utiliser ce site.",
                "L'utilisation de nos produits et services doit respecter les lois en vigueur, notamment les droits d'auteur.",
                "La transmission de contenu malveillant est interdite.",
                "Tout non-respect de ces conditions entraînera la résiliation immédiate de vos services.",
              ],
            },
          ],
        },
        {
          heading: "2. Conditions générales",
          blocks: [
            {
              type: "list",
              items: [
                "Nous nous réservons le droit de refuser le service à tout moment.",
                "Vos données peuvent être transmises sur divers réseaux, sauf les informations de carte de crédit qui sont toujours cryptées.",
                "Toute reproduction, duplication ou exploitation du Service est interdite sans notre autorisation écrite.",
                "Les titres de cet accord sont uniquement indicatifs et n'affectent pas les conditions.",
              ],
            },
          ],
        },
        {
          heading: "3. Exactitude et actualité des informations",
          blocks: [
            {
              type: "list",
              items: [
                "Nous ne garantissons pas l'exactitude, l'exhaustivité ou l'actualité des informations sur ce site.",
                "Le contenu est fourni à titre informatif et ne doit pas être la seule base de vos décisions.",
                "Les informations historiques peuvent ne pas être à jour.",
                "Nous nous réservons le droit de modifier le contenu à tout moment.",
                "Vous êtes responsable de vous tenir informé des changements sur notre site.",
              ],
            },
          ],
        },
        {
          heading: "4. Modifications des services et des prix",
          blocks: [
            {
              type: "paragraph",
              text: "Les prix de nos produits peuvent changer sans préavis.",
            },
            {
              type: "paragraph",
              text: "Pour tous les produits, le client trouvera sur les fiches produits de la plateforme des prix affichés en euros toutes taxes comprises (TTC) et une livraison rapide pour toute la France. Les prix incluent en particulier la Taxe sur la Valeur Ajoutée (TVA) au taux en vigueur à la date de Commande. Toute modification du taux applicable peut impacter le prix des Produits à compter de la date d'entrée en vigueur du nouveau taux. Le prix applicable est celui indiqué à la date à laquelle la commande est passée par le Client.",
            },
            {
              type: "paragraph",
              text: "Les frais de livraison et d'expédition sont calculés en fonction du poids réel ou du poids volumétrique de la marchandise. Ces frais s'appliquent à partir du lieu d'expédition, généralement l'usine du fabricant.",
            },
            {
              type: "paragraph",
              text: "La mise à jour des pages Internet de KOALIT rend caducs tous les prix et informations précédemment affichés concernant les produits. Seules les informations actuellement présentes sur le site font foi.",
            },
            {
              type: "paragraph",
              text: "Nous nous réservons le droit de modifier ou d'interrompre le Service à tout moment.",
            },
            {
              type: "paragraph",
              text: "Nous déclinons toute responsabilité envers vous ou des tiers pour ces changements.",
            },
          ],
        },
        {
          heading: "5. Produits et services",
          blocks: [
            {
              type: "paragraph",
              text: "Certains produits sont disponibles uniquement en ligne, avec des quantités limitées.\nLes retours et échanges sont soumis à notre politique de retour.\nNous nous efforçons de représenter fidèlement les couleurs des produits, sans garantie d'exactitude.",
            },
            {
              type: "list",
              intro: "Nous nous réservons le droit de :",
              items: [
                "Limiter les ventes par personne, région ou juridiction",
                "Modifier les quantités, descriptions et prix sans préavis",
                "Interrompre tout produit à tout moment",
              ],
            },
            {
              type: "paragraph",
              text: "Nous ne garantissons pas que la qualité des produits ou services répondra à vos attentes.",
            },
          ],
        },
        {
          heading: "6. Exactitude des informations de facturation et de compte",
          blocks: [
            {
              type: "list",
              intro: "Nous nous réservons le droit de :",
              items: [
                "Refuser toute commande",
                "Limiter ou annuler les quantités par personne, foyer ou commande",
                "Modifier ou annuler une commande en vous informant si possible",
                "Restreindre les commandes suspectes de revente ou distribution",
              ],
            },
            {
              type: "list",
              intro: "Vous vous engagez à :",
              items: [
                "Fournir des informations d'achat et de compte exactes et à jour",
                "Mettre à jour rapidement vos coordonnées (e-mail, carte de crédit, etc.)",
              ],
            },
            {
              type: "paragraph",
              text: "Pour plus d'informations, consultez notre politique de retour.",
            },
          ],
        },
        {
          heading: "7. Outils optionnels",
          blocks: [
            {
              type: "paragraph",
              text: "Nous pouvons fournir l'accès à des outils tiers sans contrôle ni responsabilité de notre part.",
            },
            {
              type: "paragraph",
              text: "Ces outils sont fournis « tels quels » et « selon disponibilité », sans garantie ni approbation.",
            },
            {
              type: "paragraph",
              text: "Votre utilisation de ces outils est à vos propres risques.",
            },
            {
              type: "paragraph",
              text: "Vous devez vous familiariser avec les conditions d'utilisation des fournisseurs tiers.",
            },
            {
              type: "paragraph",
              text: "Les nouveaux services ou fonctionnalités que nous proposerons seront soumis à ces mêmes conditions.",
            },
          ],
        },
        {
          heading: "8. Liens tiers",
          blocks: [
            {
              type: "paragraph",
              text: "Notre Service peut inclure des éléments provenant de tiers.",
            },
            {
              type: "paragraph",
              text: "Les liens tiers peuvent vous diriger vers des sites non affiliés à nous.",
            },
            {
              type: "list",
              intro: "Nous déclinons toute responsabilité concernant :",
              items: [
                "Le contenu, l'exactitude ou les produits des sites tiers",
                "Les dommages liés aux transactions effectuées sur ces sites",
              ],
            },
            {
              type: "list",
              intro: "Nous vous recommandons de :",
              items: [
                "Lire attentivement les politiques des sites tiers",
                "Adresser vos réclamations directement aux tiers concernés",
              ],
            },
          ],
        },
        {
          heading: "9. Commentaires et soumissions des utilisateurs",
          blocks: [
            {
              type: "paragraph",
              text: "En nous soumettant des commentaires, idées ou contenus, vous nous accordez le droit de les utiliser librement.",
            },
            {
              type: "list",
              intro: "Nous ne sommes pas tenus de :",
              items: [
                "Maintenir la confidentialité de ces soumissions",
                "Vous rémunérer pour celles-ci",
                "Y répondre",
              ],
            },
            {
              type: "paragraph",
              text: "Nous nous réservons le droit de modérer ou supprimer tout contenu jugé inapproprié.",
            },
            {
              type: "list",
              intro: "Vous vous engagez à ce que vos soumissions :",
              items: [
                "Ne violent pas les droits des tiers",
                "Ne soient pas diffamatoires, illégales ou malveillantes",
                "N'incluent pas de logiciels malveillants",
              ],
            },
            {
              type: "paragraph",
              text: "Vous êtes seul responsable de l'exactitude de vos commentaires.",
            },
            {
              type: "paragraph",
              text: "Nous déclinons toute responsabilité concernant les commentaires publiés par vous ou des tiers.",
            },
          ],
        },
        {
          heading: "10. Informations personnelles",
          blocks: [
            {
              type: "paragraph",
              text: "La gestion de vos informations personnelles est soumise à notre politique de confidentialité.",
            },
            {
              type: "paragraph",
              text: "Pour plus de détails, veuillez consulter notre politique de confidentialité.",
            },
          ],
        },
        {
          heading: "11. Erreurs, inexactitudes et omissions",
          blocks: [
            {
              type: "paragraph",
              text: "Notre site peut contenir des erreurs dans les descriptions, prix, promotions ou disponibilités des produits.",
            },
            {
              type: "list",
              intro: "Nous nous réservons le droit de :",
              items: [
                "Corriger ces erreurs sans préavis",
                "Modifier ou mettre à jour les informations",
                "Annuler les commandes basées sur des informations inexactes",
              ],
            },
            {
              type: "paragraph",
              text: "Nous ne sommes pas tenus de mettre à jour les informations, sauf obligation légale.",
            },
            {
              type: "paragraph",
              text: "L'absence de date de mise à jour ne garantit pas l'exactitude des informations.",
            },
          ],
        },
        {
          heading: "12. Utilisations interdites",
          blocks: [
            {
              type: "list",
              intro: "Il est interdit d'utiliser le site ou son contenu pour :",
              items: [
                "Des activités illégales ou incitant à l'illégalité",
                "Violer des lois ou réglementations",
                "Enfreindre des droits de propriété intellectuelle",
                "Harceler, discriminer ou diffamer autrui",
                "Fournir des informations fausses ou trompeuses",
                "Transmettre des virus ou codes malveillants",
                "Collecter des informations personnelles sans autorisation",
                "Pratiquer le spam, le phishing ou le scraping",
                "Des fins obscènes ou immorales",
                "Contourner les mesures de sécurité du site",
              ],
            },
            {
              type: "paragraph",
              text: "Nous nous réservons le droit de mettre fin à votre accès en cas de violation de ces interdictions.",
            },
          ],
        },
        {
          heading: "13. Exclusion de garanties et limitation de responsabilité",
          blocks: [
            {
              type: "paragraph",
              text: "Nous ne garantissons pas un service ininterrompu, sans erreurs ou des résultats fiables.",
            },
            {
              type: "paragraph",
              text: "Le service peut être suspendu ou arrêté sans préavis.",
            },
            {
              type: "paragraph",
              text: "Vous utilisez le service à vos propres risques.",
            },
            {
              type: "paragraph",
              text: "Tous les produits et services sont fournis « tels quels » et « selon disponibilité », sans garantie.",
            },
          ],
        },
        {
          heading: "14. Limitation de responsabilité",
          blocks: [
            {
              type: "paragraph",
              text: "KOALIT met tout en œuvre pour fournir des informations précises sur ses produits.",
            },
            {
              type: "paragraph",
              text: "En aucun cas, ses employés et partenaires ne sont responsables des dommages directs ou indirects résultant de l'utilisation du service.",
            },
            {
              type: "paragraph",
              text: "Cela inclut, sans s'y limiter : pertes financières, de données ou dommages similaires.",
            },
            {
              type: "paragraph",
              text: "Notre responsabilité est limitée au maximum autorisé par la loi.",
            },
          ],
        },
        {
          heading: "15. Indemnisation",
          blocks: [
            {
              type: "list",
              intro: "Vous vous engagez à indemniser et à dégager de toute responsabilité KOALIT, ses affiliés, partenaires et employés contre :",
              items: ["Toute réclamation d'un tiers", "Tous frais juridiques raisonnables"],
            },
            {
              type: "list",
              intro: "Résultant de :",
              items: [
                "Votre violation des présentes conditions d'utilisation",
                "Votre non-respect des lois en vigueur",
                "Votre atteinte aux droits d'un tiers",
              ],
            },
          ],
        },
        {
          heading: "16. Divisibilité",
          blocks: [
            {
              type: "list",
              intro: "Si une disposition de ces Conditions est jugée illégale ou inapplicable :",
              items: [
                "Elle reste exécutoire dans la limite permise par la loi",
                "La partie inapplicable est considérée comme supprimée",
                "Les autres dispositions restent valides et exécutoires",
              ],
            },
          ],
        },
        {
          heading: "17. Résiliation",
          blocks: [
            {
              type: "paragraph",
              text: "Les obligations antérieures à la résiliation restent en vigueur.",
            },
            {
              type: "paragraph",
              text: "Vous pouvez résilier ces Conditions à tout moment en cessant d'utiliser nos services.",
            },
            {
              type: "list",
              intro: "Nous pouvons résilier cet accord sans préavis si :",
              items: ["Vous ne respectez pas ces Conditions", "Nous soupçonnons un non-respect"],
            },
            {
              type: "list",
              intro: "En cas de résiliation :",
              items: [
                "Vous restez responsable des montants dus jusqu'à la date de résiliation",
                "Nous pouvons vous refuser l'accès à nos services",
              ],
            },
          ],
        },
        {
          heading: "18. Accord intégral",
          blocks: [
            {
              type: "paragraph",
              text: "Notre non-application d'un droit ne constitue pas une renonciation à ce droit.",
            },
            {
              type: "paragraph",
              text: "Ces Conditions d'utilisation, ainsi que nos politiques et règles, constituent l'accord complet entre vous et nous.",
            },
            {
              type: "paragraph",
              text: "Elles remplacent tout accord antérieur, oral ou écrit.",
            },
            {
              type: "paragraph",
              text: "Les ambiguïtés dans l'interprétation ne seront pas interprétées contre l'auteur.",
            },
          ],
        },
        {
          heading: "19. Loi applicable",
          blocks: [
            {
              type: "paragraph",
              text: "Les présentes Conditions d'utilisation et tout accord distinct pour la fourniture de services sont régis par les lois françaises.",
            },
          ],
        },
        {
          heading: "20. Modifications des Conditions de service",
          blocks: [
            {
              type: "paragraph",
              text: "Vous pouvez consulter la version la plus récente des Conditions de service à tout moment sur cette page.",
            },
            {
              type: "paragraph",
              text: "Nous nous réservons le droit de modifier ces Conditions à notre discrétion en publiant des mises à jour sur notre site.",
            },
            {
              type: "paragraph",
              text: "Il est de votre responsabilité de vérifier régulièrement notre site pour connaître les changements.",
            },
            {
              type: "paragraph",
              text: "Votre utilisation continue de notre site ou de nos services après publication des modifications constitue votre acceptation de ces changements.",
            },
          ],
        },
        {
          heading: "21. Procédure de Commande",
          blocks: [
            {
              type: "paragraph",
              text: "Les commandes de produits sont directement passées sur la Plateforme. Pour effectuer une Commande, le Client doit suivre les étapes décrites ci-dessous.",
            },
            { type: "subheading", text: "Sélection des Produits" },
            {
              type: "paragraph",
              text: "Pour sélectionner le(s) Produit(s) de son choix, le Client est invité à se connecter à son Compte ou à se créer un Compte, dans les conditions définies au sein des Conditions Générales d'Utilisation.",
            },
            {
              type: "paragraph",
              text: "Le Client devra sélectionner le(s) Produit(s) de son choix en cliquant sur le(s) Produit(s) concerné(s) et en choisissant la quantité souhaitée ou encore, le cas échéant, les caractéristiques du Produit souhaité (couleur, taille, etc.).",
            },
            {
              type: "paragraph",
              text: "Une fois le Produit sélectionné, celui-ci est placé dans le panier du Client. Le Client peut ajouter à son panier autant de Produits qu'il le souhaite.",
            },
            { type: "subheading", text: "Commandes" },
            {
              type: "paragraph",
              text: "Une fois que le Produit est placé dans son panier, le Client doit cliquer sur le panier et vérifier que le contenu de sa Commande est correct.",
            },
            {
              type: "paragraph",
              text: "Le Client est invité à vérifier le contenu de sa Commande (y compris la quantité et les références des Produits commandés, le prix et l'adresse de livraison) et fournir l'ensemble des informations nécessaires à la facturation des Produits avant de valider son contenu.",
            },
            {
              type: "paragraph",
              text: "Le client prend connaissance des présentes Conditions Commerciales ainsi que, le cas échéant, des Conditions Générales de Vente du vendeur, et les accepte lors de la validation de sa commande.",
            },
            {
              type: "paragraph",
              text: "Après vérification de sa Commande, le Client peut procéder au paiement sécurisé du ou des Produit(s) en suivant les instructions figurant sur l'espace sécurisé du Prestataire de Services de Paiement. Les Commandes passées doivent comprendre toutes les informations nécessaires à leur traitement.",
            },
            {
              type: "list",
              intro: "Le Client est expressément informé que le Vendeur aura la possibilité de refuser toute Commande qui lui parvient sous réserve de le justifier par l'un des motifs exceptionnels suivants :",
              items: [
                "Rupture de stock ;",
                "Le Produit n'est plus disponible ;",
                "Le Produit n'est plus commercialisé ;",
                "Autre motif.",
              ],
            },
            { type: "subheading", text: "Accusé de réception" },
            {
              type: "paragraph",
              text: "Une fois que toutes les étapes décrites ci-dessus sont complétées, une page apparaît sur la Plateforme afin d'accuser réception de la Commande du Client.",
            },
            {
              type: "paragraph",
              text: "Une copie de l'accusé de réception de la Commande est automatiquement adressée au Client par courrier électronique, à condition que l'adresse électronique communiquée par le biais du formulaire d'inscription ou dans le Compte soit correcte.",
            },
            { type: "subheading", text: "Facturation" },
            {
              type: "paragraph",
              text: "Pendant la procédure de Commande, le Client devra saisir les informations nécessaires à la facturation. Le Client doit notamment indiquer clairement toutes les informations relatives à la livraison, en particulier l'adresse exacte de livraison, ainsi que tout éventuel code d'accès à l'adresse de livraison.",
            },
            {
              type: "paragraph",
              text: "Sur l'espace sécurité du Prestataire de Services de Paiement, le Client doit également préciser le moyen de paiement choisi.",
            },
            {
              type: "paragraph",
              text: "Ni le bon de commande que le Client établit en ligne, ni l'accusé de réception envoyé au Client par courrier électronique ne constituent une facture. Quel que soit le mode de commande ou de paiement utilisé, le Client pourra accéder à la facture depuis son Compte.",
            },
          ],
        },
        {
          heading: "22. Droits légaux à la garantie des vices cachés",
          blocks: [
            {
              type: "paragraph",
              text: "Nos marchandises sont soumises aux droits légaux en matière de responsabilité pour les défauts.",
            },
          ],
        },
        {
          heading: "23. Transport et délais de livraison",
          blocks: [
            {
              type: "paragraph",
              text: "Délais de livraison : KOALIT s'engage à livrer les produits dans un délai maximum de 30 jours à compter de la conclusion du contrat, sauf indication contraire lors de la commande.",
            },
            {
              type: "paragraph",
              text: "Suivi de commande : Un numéro de suivi sera fourni au client pour suivre l'acheminement de sa commande.",
            },
            {
              type: "paragraph",
              text: "Livraison à domicile : Pour les articles volumineux, le transporteur contactera le client pour convenir d'un rendez-vous de livraison.",
            },
            {
              type: "paragraph",
              text: "Vérification à la réception : Le client doit vérifier l'état de l'emballage et du produit à la réception et notifier immédiatement au transporteur et à KOALIT toute anomalie constatée.",
            },
            {
              type: "paragraph",
              text: "Retard de livraison : En cas de retard de livraison, le client peut annuler sa commande par lettre recommandée avec accusé de réception après avoir enjoint KOALIT d'effectuer la livraison dans un délai supplémentaire raisonnable.",
            },
          ],
        },
        {
          heading: "24. Politique de retour et d'échange",
          blocks: [
            { type: "subheading", text: "Droit de rétractation et retours pour convenance personnelle" },
            {
              type: "paragraph",
              text: "Pour des raisons d'hygiène, les produits de literie déballés après livraison ne peuvent être ni retournés ni échangés. Cette politique est conforme à l'article L. 221-28 5° du Code de la consommation, qui exclut du droit de rétractation légal les biens descellés ne pouvant être renvoyés pour des raisons d'hygiène.",
            },
            { type: "subheading", text: "Produits défectueux" },
            {
              type: "paragraph",
              text: "En cas de réception d'un produit défectueux, vous disposez d'un délai de 7 jours pour nous en informer. Après vérification du produit retourné, nous procéderons à son échange. Contactez notre service client à l'adresse email literie1@koalit.fr pour les modalités de retour et d'échange.",
              linkEmail: "literie1@koalit.fr",
            },
            { type: "subheading", text: "Procédure de retour et frais (pour produits défectueux)" },
            {
              type: "paragraph",
              text: "Contactez notre service client par e-mail à literie1@koalit.fr pour signaler le problème avec votre produit.",
              linkEmail: "literie1@koalit.fr",
            },
            {
              type: "paragraph",
              text: "Nous vous fournirons les instructions détaillées pour le retour, incluant l'adresse et les informations d'emballage sécurisé.",
            },
            {
              type: "paragraph",
              text: "Le retour doit être effectué par transporteur, avec une assurance à hauteur de la valeur du produit. Aucun retour direct ne sera accepté pour éviter tout litige de transport.",
            },
            {
              type: "paragraph",
              text: "Les frais de retour pour les produits défectueux seront pris en charge par notre entreprise.",
            },
          ],
        },
        {
          heading: "25. Paiement",
          blocks: [
            { type: "subheading", text: "Délai de paiement" },
            {
              type: "paragraph",
              text: "Le prix est exigible en totalité après confirmation de la commande.",
            },
            { type: "subheading", text: "Modalités de paiement" },
            {
              type: "paragraph",
              text: "Le paiement s'effectue immédiatement à la Commande par carte bancaire ou par Paiement PayPal. KOALIT accepte les paiements par Carte Bleue, Visa, Mastercard ou American Express.",
            },
            { type: "subheading", text: "Paiement en plusieurs fois" },
            {
              type: "list",
              intro: "KOALIT propose également un paiement en plusieurs fois sans frais via son partenaire Alma. Les conditions sont les suivantes :",
              items: [
                "Paiement en 3 ou 4 fois sans frais pour les commandes entre 100€ et 3000€",
                "Aucuns frais supplémentaires pour le client",
                "Versement initial à la commande, puis prélèvements automatiques les mois suivants",
              ],
            },
            {
              type: "paragraph",
              text: "Le client sera clairement informé des échéances et montants avant de valider son choix de paiement en plusieurs fois.",
            },
            { type: "subheading", text: "Retard de paiement" },
            {
              type: "paragraph",
              text: "En cas de non-paiement à l'échéance, le Client sera redevable d'intérêts de retard au taux d'intérêt légal en vigueur, applicables après l'envoi d'une mise en demeure. KOALIT se réserve le droit de refuser de nouvelles commandes en cas d'incidents de paiement.",
            },
            { type: "subheading", text: "Vérification du paiement" },
            {
              type: "paragraph",
              text: "Pour prévenir la fraude, KOALIT se réserve le droit de demander des pièces justificatives d'identité ou d'adresse avant l'expédition de la commande.",
            },
            { type: "subheading", text: "Clause de réserve de propriété" },
            {
              type: "paragraph",
              text: "Les Produits restent la propriété de KOALIT jusqu'au paiement complet de la Commande, conformément à l'article 2367 du Code civil.",
            },
          ],
        },
        {
          heading: "26. Politique de protection des données personnelles",
          blocks: [
            {
              type: "paragraph",
              text: "La politique de protection des données personnelles s'applique à tous les utilisateurs du site https://koalit.fr/. Elle précise comment KOALIT, un site e-commerce appartenant à CARRE D'AS (SIRET 98783599800012, TVA FR90987835998, RCS Pontoise 987 835 998), traite et utilise les données personnelles des utilisateurs, en conformité avec le Règlement UE N°2016/679 (RGPD).",
            },
            {
              type: "paragraph",
              text: "KOALIT s'engage à protéger la vie privée de ses utilisateurs et a désigné un Délégué à la Protection des Données. L'entreprise met en œuvre des mesures techniques et organisationnelles pour garantir la sécurité et la confidentialité des données collectées. Les données personnelles sont recueillies pour des finalités légitimes telles que la gestion de la relation client, des commandes et des paiements, en ne collectant que les informations nécessaires.",
            },
            {
              type: "paragraph",
              text: "Les utilisateurs disposent de droits concernant leurs données personnelles, conformément au RGPD et à la loi Informatique et Libertés. Ces droits incluent l'accès, la rectification, la suppression, la portabilité des données, ainsi que la possibilité de s'opposer à leur traitement. Pour exercer ces droits ou poser des questions sur la protection des données, les utilisateurs peuvent contacter KOALIT à l'adresse email literie1@koalit.fr",
              linkEmail: "literie1@koalit.fr",
            },
          ],
        },
      ]}
    />
  );
}
