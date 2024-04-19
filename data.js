// {
//     id: "admin",
//     label: "Admin",
//     icon: "bx bxs-dashboard",
//     link: "/#",
//     subItems: [
//         {
//             id: "role",
//             label: "Create New Roles",
//             link: "/roles-creation",
//             parentId: "admin",
//         },
//         { 
//             id: "userRole",
//             label: "Assign User Roles",
//             link: "/assign-user-roles",
//             parentId: "admin",
//         },
//         { 
//             id: "addupdate",
//             label: "Add/Update Features",
//             link: "/add-update-features",
//             parentId: "admin",
//         },
//     ]
// },
// {
// id: "master",
// label: "Master",
// icon: "ri-contacts-book-2-line",
// link: "/#",
// subItems: [
//     {
//         id: "master-data-entry",
//         label: "Master Data Entry",
//         link: "/#",
//         isChildItem: true,
//         childItems: [
//             { 
//                 id: 'master-account', 
//                 label: "Account", 
//                 link: "/#",
//                 isChildItem: true,
//                 childItems:[
//                     {
//                         id: "group",
//                         label: "Group Creation",
//                         link: "/apps-groups-creation",
//                         parentId: "master-account",
//                     },
//                     {
//                         id: "ledger",
//                         label: "Ledger Creation",
//                         link: "/apps-ledger-creation",
//                         parentId: "master-account",
//                     },
//                     { 
//                         id: "branch",
//                         label: "Create New Branch",
//                         link: "/branch-creation",
//                         parentId: "master-account",
//                     },
//                     { 
//                         id: "depart",
//                         label: "Create New Depart",
//                         link: "/department-creation",
//                         parentId: "master-account",
//                     },
//                 ]
//             },
//             { 
//                 id: 'master-setup', 
//                 label: "SetUP", 
//                 link: "/#",    
//                 isChildItem: false,
//             },
//             { 
//                 id: 'master-inward-outward', 
//                 label: "Inward/Outward", 
//                 link: "/#",
//                 isChildItem: false,

//             },
//             { 
//                 id: 'master-sms', 
//                 label: "SMS", 
//                 link: "/#",
//                 isChildItem: false,

//             },
//             { 
//                 id: 'master-security', 
//                 label: "Security", 
//                 link: "/#",
//                 isChildItem: false,
//             },
//             { 
//                 id: 'master-master', 
//                 label: "Master", 
//                 link: "/#",
//                 isChildItem: false,
//             },
//             { 
//                 id: 'master-import', 
//                 label: "Import", 
//                 link: "/#",
//                 isChildItem: false,
//             },
//             { 
//                 id: 'master-year-end', 
//                 label: "Year End", 
//                 link: "/#",
//                 isChildItem: false,
//             },
//         ]
//     },
//     {
//         id: "member-registration",
//         label: "Member Registration",
//         link: "/#",
//         isChildItem: true,
//         childItems: [
//             { 
//                 id: 'master-account1', 
//                 label: "Account 1", 
//                 link: "/#",
//                 isChildItem: true,
//                 childItems:[
//                     {
//                         id: "group1",
//                         label: "Group Creation 1",
//                         link: "/apps-groups-creation",
//                         parentId: "master-account1",
//                     },
//                     {
//                         id: "ledger1",
//                         label: "Ledger Creation 1",
//                         link: "/apps-ledger-creation",
//                         parentId: "master-account1",
//                     },
//                 ]
//             },
//         ]
//     },
//     {
//         id: "member-query",
//         label: "Member Query",
//         link: "/#",
//         isChildItem: false
//     },
// ]
// }





// Example usage
const permissionsData = {
    "id": "18e9b01f4c6e7ta9r",
    "label": "Master",
    "icon": "ri-contacts-book-2-line",
    "link": "/#",
    "parentId": null,
    "read": false,
    "write": false,
    "isChildItem": false,
    "children": [
        {
            "id": "18e9b0885f8bnknpa",
            "label": "Master Data Entry",
            "icon": null,
            "link": "/#",
            "parentId": "18e9b01f4c6e7ta9r",
            "read": false,
            "write": false,
            "isChildItem": true,
            "children": [
                {
                    "id": "18e9b12aba0sdwbb7",
                    "label": "Account",
                    "icon": null,
                    "link": "/#",
                    "parentId": "18e9b0885f8bnknpa",
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [

                        {
                            "id": "18e9b14072fct849y",
                            "label": "Group Creation",
                            "icon": null,
                            "link": "/apps-groups-creation",
                            "parentId": "18e9b12aba0sdwbb7",
                            "read": true,
                            "write": true,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9b143528rg7sc6",
                            "label": "Ledger Creation",
                            "icon": null,
                            "link": "/apps-ledger-creation",
                            "parentId": "18e9b12aba0sdwbb7",
                            "read": true,
                            "write": true,
                            "isChildItem": false
                        }
                    ]
                },
            ]
        },
    ]
}

{
    "success": true,
    "message": "Permissions fetched successfully",
    "result": {
        "id": "18e9b01f4c6e7ta9r",
        "label": "Master",
        "icon": "ri-contacts-book-2-line",
        "link": "/#",
        "parentId": null,
        "read": false,
        "write": false,
        "isChildItem": false,
        "children": [
            {
                "id": "18e9b0885f8bnknpa",
                "label": "Master Data Entry",
                "icon": null,
                "link": "/#",
                "parentId": "18e9b01f4c6e7ta9r",
                "read": false,
                "write": false,
                "isChildItem": true,
                "children": [
                    {
                        "id": "18e9b12aba0sdwbb7",
                        "label": "Account",
                        "icon": null,
                        "link": "/#",
                        "parentId": "18e9b0885f8bnknpa",
                        "read": false,
                        "write": false,
                        "isChildItem": true,
                        "children": [
                            {
                                "id": "18e9b14072fct849y",
                                "label": "Group Creation",
                                "icon": null,
                                "link": "/apps-groups-creation",
                                "parentId": "18e9b12aba0sdwbb7",
                                "read": true,
                                "write": true,
                                "isChildItem": false
                            },
                            {
                                "id": "18e9b143528rg7sc6",
                                "label": "Ledger Creation",
                                "icon": null,
                                "link": "/apps-ledger-creation",
                                "parentId": "18e9b12aba0sdwbb7",
                                "read": true,
                                "write": true,
                                "isChildItem": false
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

function filterAndModify(input) {
    if (!input.children || input.children.length === 0) {
        if (!input.read && !input.write) {
            return null; // Skip this element
        }
        return input; // Keep this element
    }

    const filteredChildren = input.children.map(child => filterAndModify(child)).filter(Boolean);

    if (filteredChildren.length === 0) {
        return null; // Skip this element if all children are skipped
    }

    return {
        ...input,
        children: filteredChildren
    };
}

const input =  {
    "id": "18e9b01f4c6e7ta9r",
    "label": "Master",
    "icon": "ri-contacts-book-2-line",
    "link": "/#",
    "parentId": null,
    "read": false,
    "write": false,
    "isChildItem": false,
    "children": [
        {
            "id": "18e9b0885f8bnknpa",
            "label": "Master Data Entry",
            "icon": null,
            "link": "/#",
            "parentId": "18e9b01f4c6e7ta9r",
            "read": false,
            "write": false,
            "isChildItem": true,
            "children": [
                {
                    "id": "18e9b12aba0sdwbb7",
                    "label": "Account",
                    "icon": null,
                    "link": "/#",
                    "parentId": "18e9b0885f8bnknpa",
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [
                        {
                            "id": "18e9b1463c8649ykt",
                            "label": "Bank Creation",
                            "icon": null,
                            "link": "/bank-creation",
                            "parentId": "18e9b12aba0sdwbb7",
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9b14fd147f86qa",
                            "label": "Branch Creation",
                            "icon": null,
                            "link": "/branch-creation",
                            "parentId": "18e9b12aba0sdwbb7",
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9b15380c8osrbh",
                            "label": "Department Creation",
                            "icon": null,
                            "link": "/department-creation",
                            "parentId": "18e9b12aba0sdwbb7",
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9b14072fct849y",
                            "label": "Group Creation",
                            "icon": null,
                            "link": "/apps-groups-creation",
                            "parentId": "18e9b12aba0sdwbb7",
                            "read": true,
                            "write": true,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9b143528rg7sc6",
                            "label": "Ledger Creation",
                            "icon": null,
                            "link": "/apps-ledger-creation",
                            "parentId": "18e9b12aba0sdwbb7",
                            "read": true,
                            "write": true,
                            "isChildItem": false
                        }
                    ]
                },
                {
                    "id": "18e9b1367f7z0a3mz",
                    "label": "Import",
                    "icon": null,
                    "link": "/#",
                    "parentId": "18e9b0885f8bnknpa",
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [
                        {
                            "id": "18e9d749c7flxscy4",
                            "label": "Import Data-1",
                            "icon": null,
                            "link": "/import-data",
                            "parentId": "18e9b1367f7z0a3mz",
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d74ae1bh1x0fu",
                            "label": "Import Data-2",
                            "icon": null,
                            "link": "/import-data-2",
                            "parentId": "18e9b1367f7z0a3mz",
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        }
                    ]
                },
                {
                    "id": "18e9b12ec7dui3eq5",
                    "label": "Inward/Outward",
                    "icon": null,
                    "link": "/#",
                    "parentId": "18e9b0885f8bnknpa",
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [
                        {
                            "id": "18e9d72c5bc3un598",
                            "label": "Inward/Outward-child-1",
                            "icon": null,
                            "link": "/inward-outward-creation",
                            "parentId": "18e9b12ec7dui3eq5",
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d72d8537bzkt1",
                            "label": "Inward/Outward-child-2",
                            "icon": null,
                            "link": "/inward-outward-creation-1",
                            "parentId": "18e9b12ec7dui3eq5",
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        }
                    ]
                },
                {
                    "id": "18e9b1348d57uc5nv",
                    "label": "Master",
                    "icon": null,
                    "link": "/#",
                    "parentId": "18e9b0885f8bnknpa",
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [
                        {
                            "id": "18e9d743709a9k7ke",
                            "label": "Master-Account-1",
                            "icon": null,
                            "link": "/master-account-creation",
                            "parentId": "18e9b1348d57uc5nv",
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d7448e5vp3thh",
                            "label": "Master-Account-2",
                            "icon": null,
                            "link": "/master-account-creation-2",
                            "parentId": "18e9b1348d57uc5nv",
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        }
                    ]
                },
                {
                    "id": "18e9b132ba71lc5ct",
                    "label": "Security",
                    "icon": null,
                    "link": "/#",
                    "parentId": "18e9b0885f8bnknpa",
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [
                        {
                            "id": "18e9d73c25732y1hi",
                            "label": "Security services-1",
                            "icon": null,
                            "link": "/Security services-1-creation",
                            "parentId": "18e9b132ba71lc5ct",
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d73d100wfn11o",
                            "label": "Security services-2",
                            "icon": null,
                            "link": "/Security services-2-creation",
                            "parentId": "18e9b132ba71lc5ct",
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        }
                    ]
                },
                {
                    "id": "18e9b12cc84uxsyvl",
                    "label": "SetUp",
                    "icon": null,
                    "link": "/#",
                    "parentId": "18e9b0885f8bnknpa",
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [
                        {
                            "id": "18e9d725828fvxn2q",
                            "label": "SetUp child-1",
                            "icon": null,
                            "link": "/setup-child-1",
                            "parentId": "18e9b12cc84uxsyvl",
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d726edfwcnr65",
                            "label": "SetUp child-2",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        }
                    ]
                },
                {
                    "id": "18e9b1310040i6mf6",
                    "label": "SMS",
                    "icon": null,
                    "link": null,
                    "parentId": null,
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [
                        {
                            "id": "18e9d734d6230b5do",
                            "label": "SMS services-1",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d735dbccrmn5k",
                            "label": "SMS services-2",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        }
                    ]
                },
                {
                    "id": "18e9b139c049dbk2i",
                    "label": "Year End",
                    "icon": null,
                    "link": null,
                    "parentId": null,
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [
                        {
                            "id": "18e9d753e1fkitklb",
                            "label": "Year End Reports-1",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d754f704iyj7c",
                            "label": "Year End Reports-2",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        }
                    ]
                }
            ]
        },
        {
            "id": "18e9b10fe45dco23k",
            "label": "Member Query",
            "icon": null,
            "link": null,
            "parentId": null,
            "read": false,
            "write": false,
            "isChildItem": false
        },
        {
            "id": "18e9b1132259oay00",
            "label": "Member Query New",
            "icon": null,
            "link": null,
            "parentId": null,
            "read": false,
            "write": false,
            "isChildItem": false
        },
        {
            "id": "18e9b10cd9ezob3rr",
            "label": "Member Registration",
            "icon": null,
            "link": null,
            "parentId": null,
            "read": false,
            "write": false,
            "isChildItem": true,
            "children": [
                {
                    "id": "18e9d7c0ea5vw03c0",
                    "label": "Account-1",
                    "icon": null,
                    "link": null,
                    "parentId": null,
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [
                        {
                            "id": "18e9d7f94dfza9qle",
                            "label": "Bank Creation-1",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d7fbac5du6yt5",
                            "label": "Branch Creation-1",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d7fdad6r2modt",
                            "label": "Department Creation-1",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d7f46f9t868nw",
                            "label": "Group Creation-1",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d7f6dc6sm2dtg",
                            "label": "Ledger Creation-1",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        }
                    ]
                },
                {
                    "id": "18e9d7ce3728t43du",
                    "label": "Import-1",
                    "icon": null,
                    "link": null,
                    "parentId": null,
                    "read": false,
                    "write": false,
                    "isChildItem": false
                },
                {
                    "id": "18e9d7c5ec05fkdxe",
                    "label": "Inward/Outward-1",
                    "icon": null,
                    "link": null,
                    "parentId": null,
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [
                        {
                            "id": "18e9d80c798dj4325",
                            "label": "Inward/Outward-child-1-1",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d80d7eefd0r77",
                            "label": "Inward/Outward-child-1-2",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        }
                    ]
                },
                {
                    "id": "18e9d7cc4d8dfka15",
                    "label": "Master-1",
                    "icon": null,
                    "link": null,
                    "parentId": null,
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [
                        {
                            "id": "18e9d87d2afipjg8l",
                            "label": "Master-Account-1-1",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d87e198nlp5v6",
                            "label": "Master-Account-1-2",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        }
                    ]
                },
                {
                    "id": "18e9d7ca4admg3v5k",
                    "label": "Security-1",
                    "icon": null,
                    "link": null,
                    "parentId": null,
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [
                        {
                            "id": "18e9d86c7ba0v7f5a",
                            "label": "Security services-1-1",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d86d90duo85hz",
                            "label": "Security services-1-2",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d85f9a59xgbhz",
                            "label": "SMS services-1-1",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        }
                    ]
                },
                {
                    "id": "18e9d7c3fe277rdzt",
                    "label": "SetUp-1",
                    "icon": null,
                    "link": null,
                    "parentId": null,
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [
                        {
                            "id": "18e9d804d899dyfpp",
                            "label": "SetUp child-1-1",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        },
                        {
                            "id": "18e9d8060f6kui4ga",
                            "label": "SetUp child-1-2",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        }
                    ]
                },
                {
                    "id": "18e9d7c8576hoao3m",
                    "label": "SMS",
                    "icon": null,
                    "link": null,
                    "parentId": null,
                    "read": false,
                    "write": false,
                    "isChildItem": true,
                    "children": [
                        {
                            "id": "18e9d818a8fiykukx",
                            "label": "SMS-service-1-1",
                            "icon": null,
                            "link": null,
                            "parentId": null,
                            "read": false,
                            "write": false,
                            "isChildItem": false
                        }
                    ]
                },
                {
                    "id": "18e9d7d072a7zpt5h",
                    "label": "Year End-1",
                    "icon": null,
                    "link": null,
                    "parentId": null,
                    "read": false,
                    "write": false,
                    "isChildItem": false
                }
            ]
        }
    ]
}
const output = filterAndModify(input);
console.log(JSON.stringify(output));

// const filteredPermissions = filterAndModifyPermissions(permissionsData);
// console.log(filteredPermissions);

