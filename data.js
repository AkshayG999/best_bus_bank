{
    id: "admin",
    label: "Admin",
    icon: "bx bxs-dashboard",
    link: "/#",
    children: [
        {
            id: "role",
            label: "Create New Roles",
            link: "/roles-creation",
            parentId: "admin",
        },
        { 
            id: "userRole",
            label: "Assign User Roles",
            link: "/assign-user-roles",
            parentId: "admin",
        },
        { 
            id: "addupdate",
            label: "Add/Update Features",
            link: "/add-update-features",
            parentId: "admin",
        },
    ]
},
{
id: "master",
label: "Master",
icon: "ri-contacts-book-2-line",
link: "/#",
children: [
    {
        id: "master-data-entry",
        label: "Master Data Entry",
        link: "/#",
        isChildItem: true,
        children: [
            { 
                id: 'master-account', 
                label: "Account", 
                link: "/#",
                isChildItem: true,
                children:[
                    {
                        id: "group",
                        label: "Group Creation",
                        link: "/apps-groups-creation",
                        parentId: "master-account",
                    },
                    {
                        id: "ledger",
                        label: "Ledger Creation",
                        link: "/apps-ledger-creation",
                        parentId: "master-account",
                    },
                    { 
                        id: "branch",
                        label: "Create New Branch",
                        link: "/branch-creation",
                        parentId: "master-account",
                    },
                    { 
                        id: "depart",
                        label: "Create New Depart",
                        link: "/department-creation",
                        parentId: "master-account",
                    },
                ]
            },
            { 
                id: 'master-setup', 
                label: "SetUP", 
                link: "/#",    
                isChildItem: false,
            },
            { 
                id: 'master-inward-outward', 
                label: "Inward/Outward", 
                link: "/#",
                isChildItem: false,
                
            },
            { 
                id: 'master-sms', 
                label: "SMS", 
                link: "/#",
                isChildItem: false,
                
            },
            { 
                id: 'master-security', 
                label: "Security", 
                link: "/#",
                isChildItem: false,
            },
            { 
                id: 'master-master', 
                label: "Master", 
                link: "/#",
                isChildItem: false,
            },
            { 
                id: 'master-import', 
                label: "Import", 
                link: "/#",
                isChildItem: false,
            },
            { 
                id: 'master-year-end', 
                label: "Year End", 
                link: "/#",
                isChildItem: false,
            },
        ]
    },
    {
        id: "member-registration",
        label: "Member Registration",
        link: "/#",
        isChildItem: true,
        childItems: [
            { 
                id: 'master-account1', 
                label: "Account 1", 
                link: "/#",
                isChildItem: true,
                childItems:[
                    {
                        id: "group1",
                        label: "Group Creation 1",
                        link: "/apps-groups-creation",
                        parentId: "master-account1",
                    },
                    {
                        id: "ledger1",
                        label: "Ledger Creation 1",
                        link: "/apps-ledger-creation",
                        parentId: "master-account1",
                    },
                ]
            },
        ]
    },
    {
        id: "member-query",
        label: "Member Query",
        link: "/#",
        isChildItem: false
    },
]
},
{
id: "apps",
label: "Account",
icon: "ri-booklet-line",
link: "/#",
// click: function (e) {
//     e.preventDefault();
//     setIsApps(!isApps);
//     setIscurrentState('Apps');
//     updateIconSidebar(e);
// },
// stateVariables: isApps,
subItems: [
    // {
    //     id: "group",
    //     label: "Group Creation",
    //     link: "/apps-groups-creation",
    //     parentId: "apps",
    // },
    // {
    //     id: "ledger",
    //     label: "Ledger Creation",
    //     link: "/apps-ledger-creation",
    //     parentId: "apps",
    // },
    // {
    //     id: "mailbox",
    //     label: "Email",
    //     link: "/#",
    //     parentId: "apps",
    //     isChildItem: true,
    //     click: function (e) {
    //         e.preventDefault();
    //         setEmail(!isEmail);
    //     },
    //     stateVariables: isEmail,
    //     childItems: [
    //         {
    //             id: 1,
    //             label: "Mailbox",
    //             link: "/apps-mailbox",
    //             parentId: "apps"
    //         },
    //         {
    //             id: 2,
    //             label: "Email Templates",
    //             link: "/#",
    //             parentId: "apps",
    //             isChildItem: true,
    //             stateVariables: isSubEmail,
    //             click: function (e) {
    //                 e.preventDefault();
    //                 setSubEmail(!isSubEmail);
    //             },
    //             childItems: [
    //                 { id: 2, label: "Basic Action", link: "/apps-email-basic", parentId: "apps" },
    //                 { id: 3, label: "Ecommerce Action", link: "/apps-email-ecommerce", parentId: "apps" },
    //             ],
    //         },
    //     ]
    // },
    // {
    //     id: "appsecommerce",
    //     label: "Ecommerce",
    //     link: "/#",
    //     isChildItem: true,
    //     click: function (e) {
    //         e.preventDefault();
    //         setIsEcommerce(!isEcommerce);
    //     },
    //     parentId: "apps",
    //     stateVariables: isEcommerce,
    //     childItems: [
    //         { id: 1, label: "Products", link: "/apps-ecommerce-products", parentId: "apps" },
    //         { id: 2, label: "Product Details", link: "/apps-ecommerce-product-details", parentId: "apps" },
    //         { id: 3, label: "Create Product", link: "/apps-ecommerce-add-product", parentId: "apps" },
    //         { id: 4, label: "Orders", link: "/apps-ecommerce-orders", parentId: "apps" },
    //         { id: 5, label: "Order Details", link: "/apps-ecommerce-order-details", parentId: "apps" },
    //         { id: 6, label: "Customers", link: "/apps-ecommerce-customers", parentId: "apps" },
    //         { id: 7, label: "Shopping Cart", link: "/apps-ecommerce-cart", parentId: "apps" },
    //         { id: 8, label: "Checkout", link: "/apps-ecommerce-checkout", parentId: "apps" },
    //         { id: 9, label: "Sellers", link: "/apps-ecommerce-sellers", parentId: "apps" },
    //         { id: 10, label: "Seller Details", link: "/apps-ecommerce-seller-details", parentId: "apps" },
    //     ]
    // },
    // {
    //     id: "appsprojects",
    //     label: "Projects",
    //     link: "/#",
    //     isChildItem: true,
    //     click: function (e) {
    //         e.preventDefault();
    //         setIsProjects(!isProjects);
    //     },
    //     parentId: "apps",
    //     stateVariables: isProjects,
    //     childItems: [
    //         { id: 1, label: "List", link: "/apps-projects-list", parentId: "apps", },
    //         { id: 2, label: "Overview", link: "/apps-projects-overview", parentId: "apps", },
    //         { id: 3, label: "Create Project", link: "/apps-projects-create", parentId: "apps", },
    //     ]
    // },
    // {
    //     id: "tasks",
    //     label: "Tasks",
    //     link: "/#",
    //     isChildItem: true,
    //     click: function (e) {
    //         e.preventDefault();
    //         setIsTasks(!isTasks);
    //     },
    //     parentId: "apps",
    //     stateVariables: isTasks,
    //     childItems: [
    //         { id: 1, label: "Kanban Board", link: "/apps-tasks-kanban", parentId: "apps", },
    //         { id: 2, label: "List View", link: "/apps-tasks-list-view", parentId: "apps", },
    //         { id: 3, label: "Task Details", link: "/apps-tasks-details", parentId: "apps", },
    //     ]
    // },
    // {
    //     id: "appscrm",
    //     label: "CRM",
    //     link: "/#",
    //     isChildItem: true,
    //     click: function (e) {
    //         e.preventDefault();
    //         setIsCRM(!isCRM);
    //     },
    //     parentId: "apps",
    //     stateVariables: isCRM,
    //     childItems: [
    //         { id: 1, label: "Contacts", link: "/apps-crm-contacts" },
    //         { id: 2, label: "Companies", link: "/apps-crm-companies" },
    //         { id: 3, label: "Deals", link: "/apps-crm-deals" },
    //         { id: 4, label: "Leads", link: "/apps-crm-leads" },
    //     ]
    // },
    // {
    //     id: "appscrypto",
    //     label: "Crypto",
    //     link: "/#",
    //     isChildItem: true,
    //     click: function (e) {
    //         e.preventDefault();
    //         setIsCrypto(!isCrypto);
    //     },
    //     parentId: "apps",
    //     stateVariables: isCrypto,
    //     childItems: [
    //         { id: 1, label: "Transactions", link: "/apps-crypto-transactions" },
    //         { id: 2, label: "Buy & Sell", link: "/apps-crypto-buy-sell" },
    //         { id: 3, label: "Orders", link: "/apps-crypto-orders" },
    //         { id: 4, label: "My Wallet", link: "/apps-crypto-wallet" },
    //         { id: 5, label: "ICO List", link: "/apps-crypto-ico" },
    //         { id: 6, label: "KYC Application", link: "/apps-crypto-kyc" },
    //     ]
    // },
    // {
    //     id: "invoices",
    //     label: "Invoices",
    //     link: "/#",
    //     isChildItem: true,
    //     click: function (e) {
    //         e.preventDefault();
    //         setIsInvoices(!isInvoices);
    //     },
    //     parentId: "apps",
    //     stateVariables: isInvoices,
    //     childItems: [
    //         { id: 1, label: "List View", link: "/apps-invoices-list" },
    //         { id: 2, label: "Details", link: "/apps-invoices-details" },
    //         { id: 3, label: "Create Invoice", link: "/apps-invoices-create" },
    //     ]
    // },
    // {
    //     id: "supportTickets",
    //     label: "Support Tickets",
    //     link: "/#",
    //     isChildItem: true,
    //     click: function (e) {
    //         e.preventDefault();
    //         setIsSupportTickets(!isSupportTickets);
    //     },
    //     parentId: "apps",
    //     stateVariables: isSupportTickets,
    //     childItems: [
    //         { id: 1, label: "List View", link: "/apps-tickets-list" },
    //         { id: 2, label: "Ticket Details", link: "/apps-tickets-details" },
    //     ]
    // },
    // {
    //     id: "NFTMarketplace",
    //     label: "NFT Marketplace",
    //     link: "/#",
    //     isChildItem: true,
    //     click: function (e) {
    //         e.preventDefault();
    //         setIsNFTMarketplace(!isNFTMarketplace);
    //     },
    //     parentId: "apps",
    //     stateVariables: isNFTMarketplace,
    //     childItems: [
    //         { id: 1, label: "Marketplace", link: "/apps-nft-marketplace" },
    //         { id: 2, label: "Explore Now", link: "/apps-nft-explore" },
    //         { id: 3, label: "Live Auction", link: "/apps-nft-auction" },
    //         { id: 4, label: "Item Details", link: "/apps-nft-item-details" },
    //         { id: 5, label: "Collections", link: "/apps-nft-collections" },
    //         { id: 6, label: "Creators", link: "/apps-nft-creators" },
    //         { id: 7, label: "Ranking", link: "/apps-nft-ranking" },
    //         { id: 8, label: "Wallet Connect", link: "/apps-nft-wallet" },
    //         { id: 9, label: "Create NFT", link: "/apps-nft-create" },
    //     ]
    // }
],
},
{
id: "reports",
label: "Reports",
icon: "ri-pie-chart-2-line",
link: "/#",
// click: function (e) {
//     e.preventDefault();
//     setIsReports(!isReports);
//     setIscurrentState('Reports');
//     updateIconSidebar(e);
// },
// stateVariables: isReports,
subItems: [
],
},
{
id: "loan",
label: "Loan",
icon: "ri-hand-heart-line",
link: "/#",
// click: function (e) {
//     e.preventDefault();
//     setIsLoan(!isLoan);
//     setIscurrentState('Loan');
//     updateIconSidebar(e);
// },
// stateVariables: isLoan,
subItems: [
],
},
{
id: "fixed-deposite",
label: "Fixed Deposite",
icon: "ri-wallet-3-line",
link: "/#",
// click: function (e) {
//     e.preventDefault();
//     setIsFixedDeposite(!isFixedDeposite);
//     setIscurrentState('Fixed Deposite');
//     updateIconSidebar(e);
// },
// stateVariables: isFixedDeposite,
subItems: [
],
},
{
id: "recovery",
label: "Recovery",
icon: "ri-device-recover-line",
link: "/#",
// click: function (e) {
//     e.preventDefault();
//     setIsRecovery(!isRecovery);
//     setIscurrentState('Recovery');
//     updateIconSidebar(e);
// },
// stateVariables: isRecovery,
subItems: [
],
},
{
id: "cert-div",
label: "Share Cert. & Div.",
icon: "ri-divide-line",
link: "/#",
// click: function (e) {
//     e.preventDefault();
//     setIsCertDiv(!isCertDiv);
//     setIscurrentState('Share Cert. & Div.');
//     updateIconSidebar(e);
// },
// stateVariables: isCertDiv,
subItems: [
],
},
{
id: "document-management",
label: "Document Management",
icon: "ri-file-list-3-line",
link: "/#",
// click: function (e) {
//     e.preventDefault();
//     setIsDocManagement(!isDocManagement);
//     setIscurrentState('Document Management');
//     updateIconSidebar(e);
// },
// stateVariables: isDocManagement,
subItems: [
],
},
{
id: "other",
label: "Other",
icon: "ri-lightbulb-line",
link: "/#",
// click: function (e) {
//     e.preventDefault();
//     setIsOther(!isOther);
//     setIscurrentState('Other');
//     updateIconSidebar(e);
// },
// stateVariables: isOther,
subItems: [
],
},