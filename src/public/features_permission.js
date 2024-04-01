const { features_A } = require("../config/db")

const { features_master_permission } = require("../config/db")

[
    {
        "id": "18e6cb5f4a2u1b1t6",
        "read": false,
        "write": false,
        "featuresMasterId": "18e66cc146d8o7321",
        "userSystemID": "OK9IM6SGE",
        "features_master": {
            "id": "18e66cc146d8o7321",
            "name": "Admin",
            "description": "Admin",
        },
        "a_permission": [
            {
                "id": "18e6cb5f696s95qly",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.278Z",
                "updatedAt": "2024-03-23T19:07:28.278Z",
                "featuresAId": "18e67048963p2d660",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a2u1b1t6",
                "features_A": {
                    "id": "18e67048963p2d660",
                    "name": "Administration",
                    "description": "Administration",
                    "createdAt": "2024-03-22T16:35:34.371Z",
                    "updatedAt": "2024-03-22T16:35:34.371Z",
                    "featuresMasterId": "18e66cc146d8o7321"
                },
                "b_permission": []
            }
        ]
    },
    {
        "id": "18e6cb5f4a5p54obh",
        "read": false,
        "write": false,
        "createdAt": "2024-03-23T19:07:27.781Z",
        "updatedAt": "2024-03-23T19:07:27.781Z",
        "featuresMasterId": "18e66cc4eb5u4ql30",
        "userSystemID": "OK9IM6SGE",
        "features_master": {
            "id": "18e66cc4eb5u4ql30",
            "name": "Master",
            "description": "Master",
            "createdAt": "2024-03-22T15:34:09.333Z",
            "updatedAt": "2024-03-22T15:34:09.333Z"
        },
        "a_permission": [
            {
                "id": "18e6cb5f692sd5twc",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.274Z",
                "updatedAt": "2024-03-23T19:07:28.274Z",
                "featuresAId": "18e66eda80cvjnz9x",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5p54obh",
                "features_A": {
                    "id": "18e66eda80cvjnz9x",
                    "name": "Member Query New",
                    "description": "Member Query New",
                    "createdAt": "2024-03-22T16:10:34.892Z",
                    "updatedAt": "2024-03-22T16:10:34.892Z",
                    "featuresMasterId": "18e66cc4eb5u4ql30"
                },
                "b_permission": [
                    {
                        "id": "18e6cb5f8495mbldp",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.713Z",
                        "updatedAt": "2024-03-23T19:07:28.713Z",
                        "featuresBId": "18e6721ba00z0raqt",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sd5twc",
                        "features_B": {
                            "id": "18e6721ba00z0raqt",
                            "name": "Inward/Outward-2",
                            "description": "Inward/Outward-2",
                            "createdAt": "2024-03-22T17:07:27.360Z",
                            "updatedAt": "2024-03-22T17:07:27.360Z",
                            "featuresAId": "18e66eda80cvjnz9x"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f849wvrnus",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.713Z",
                        "updatedAt": "2024-03-23T19:07:28.713Z",
                        "featuresBId": "18e6721ba00yk4kxa",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sd5twc",
                        "features_B": {
                            "id": "18e6721ba00yk4kxa",
                            "name": "SMS-2",
                            "description": "SMS-2",
                            "createdAt": "2024-03-22T17:07:27.360Z",
                            "updatedAt": "2024-03-22T17:07:27.360Z",
                            "featuresAId": "18e66eda80cvjnz9x"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f849y2j2i0",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.714Z",
                        "updatedAt": "2024-03-23T19:07:28.714Z",
                        "featuresBId": "18e6721b9ff08erky",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sd5twc",
                        "features_B": {
                            "id": "18e6721b9ff08erky",
                            "name": "Account-2",
                            "description": "Account-2",
                            "createdAt": "2024-03-22T17:07:27.360Z",
                            "updatedAt": "2024-03-22T17:07:27.360Z",
                            "featuresAId": "18e66eda80cvjnz9x"
                        },
                        "c_permission": [
                            {
                                "id": "18e6cb5f9ffaf0z03",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.151Z",
                                "updatedAt": "2024-03-23T19:07:29.151Z",
                                "featuresCId": "18e672a1e96qko5ea",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f849y2j2i0",
                                "features_C": {
                                    "id": "18e672a1e96qko5ea",
                                    "name": "Ledger Creation-3",
                                    "description": "Ledger Creation-3",
                                    "createdAt": "2024-03-22T17:16:37.398Z",
                                    "updatedAt": "2024-03-22T17:16:37.398Z",
                                    "featuresBId": "18e6721b9ff08erky"
                                }
                            },
                            {
                                "id": "18e6cb5f9ffmgtb0y",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.151Z",
                                "updatedAt": "2024-03-23T19:07:29.151Z",
                                "featuresCId": "18e672a1e96mvb316",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f849y2j2i0",
                                "features_C": {
                                    "id": "18e672a1e96mvb316",
                                    "name": "Branch Creation-3",
                                    "description": "Branch Creation-3",
                                    "createdAt": "2024-03-22T17:16:37.398Z",
                                    "updatedAt": "2024-03-22T17:16:37.398Z",
                                    "featuresBId": "18e6721b9ff08erky"
                                }
                            },
                            {
                                "id": "18e6cb5f9ff3j4j0y",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.151Z",
                                "updatedAt": "2024-03-23T19:07:29.151Z",
                                "featuresCId": "18e672a1e96z2cg7y",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f849y2j2i0",
                                "features_C": {
                                    "id": "18e672a1e96z2cg7y",
                                    "name": "Bank Creation-3",
                                    "description": "Bank Creation-3",
                                    "createdAt": "2024-03-22T17:16:37.398Z",
                                    "updatedAt": "2024-03-22T17:16:37.398Z",
                                    "featuresBId": "18e6721b9ff08erky"
                                }
                            },
                            {
                                "id": "18e6cb5f9ffca1uhz",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.151Z",
                                "updatedAt": "2024-03-23T19:07:29.151Z",
                                "featuresCId": "18e672a1e94c9l1vt",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f849y2j2i0",
                                "features_C": {
                                    "id": "18e672a1e94c9l1vt",
                                    "name": "Group Creation-3",
                                    "description": "Group Creation-3",
                                    "createdAt": "2024-03-22T17:16:37.397Z",
                                    "updatedAt": "2024-03-22T17:16:37.397Z",
                                    "featuresBId": "18e6721b9ff08erky"
                                }
                            },
                            {
                                "id": "18e6cb5fa0061plyy",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.152Z",
                                "updatedAt": "2024-03-23T19:07:29.152Z",
                                "featuresCId": "18e672a1e96uvvq62",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f849y2j2i0",
                                "features_C": {
                                    "id": "18e672a1e96uvvq62",
                                    "name": "Department Creation-3",
                                    "description": "Department Creation-3",
                                    "createdAt": "2024-03-22T17:16:37.398Z",
                                    "updatedAt": "2024-03-22T17:16:37.398Z",
                                    "featuresBId": "18e6721b9ff08erky"
                                }
                            }
                        ]
                    },
                    {
                        "id": "18e6cb5f84ao92d4m",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.714Z",
                        "updatedAt": "2024-03-23T19:07:28.714Z",
                        "featuresBId": "18e6721ba00p2naqe",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sd5twc",
                        "features_B": {
                            "id": "18e6721ba00p2naqe",
                            "name": "Setup-2",
                            "description": "Setup-2",
                            "createdAt": "2024-03-22T17:07:27.360Z",
                            "updatedAt": "2024-03-22T17:07:27.360Z",
                            "featuresAId": "18e66eda80cvjnz9x"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f84al727cf",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.714Z",
                        "updatedAt": "2024-03-23T19:07:28.714Z",
                        "featuresBId": "18e6721ba01evx5g6",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sd5twc",
                        "features_B": {
                            "id": "18e6721ba01evx5g6",
                            "name": "Security-2",
                            "description": "Security-2",
                            "createdAt": "2024-03-22T17:07:27.361Z",
                            "updatedAt": "2024-03-22T17:07:27.361Z",
                            "featuresAId": "18e66eda80cvjnz9x"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f84a5kubed",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.714Z",
                        "updatedAt": "2024-03-23T19:07:28.714Z",
                        "featuresBId": "18e6721ba01exa25d",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sd5twc",
                        "features_B": {
                            "id": "18e6721ba01exa25d",
                            "name": "Master-2",
                            "description": "Master-2",
                            "createdAt": "2024-03-22T17:07:27.361Z",
                            "updatedAt": "2024-03-22T17:07:27.361Z",
                            "featuresAId": "18e66eda80cvjnz9x"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f84aq4z7nt",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.714Z",
                        "updatedAt": "2024-03-23T19:07:28.714Z",
                        "featuresBId": "18e6721ba01sf9vwn",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sd5twc",
                        "features_B": {
                            "id": "18e6721ba01sf9vwn",
                            "name": "Import-2",
                            "description": "Import-2",
                            "createdAt": "2024-03-22T17:07:27.361Z",
                            "updatedAt": "2024-03-22T17:07:27.361Z",
                            "featuresAId": "18e66eda80cvjnz9x"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f84aer6gfk",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.714Z",
                        "updatedAt": "2024-03-23T19:07:28.714Z",
                        "featuresBId": "18e6721ba014jkpeh",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sd5twc",
                        "features_B": {
                            "id": "18e6721ba014jkpeh",
                            "name": "YearEnd-2",
                            "description": "YearEnd-2",
                            "createdAt": "2024-03-22T17:07:27.361Z",
                            "updatedAt": "2024-03-22T17:07:27.361Z",
                            "featuresAId": "18e66eda80cvjnz9x"
                        },
                        "c_permission": []
                    }
                ]
            },
            {
                "id": "18e6cb5f692sq1cdb",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.274Z",
                "updatedAt": "2024-03-23T19:07:28.274Z",
                "featuresAId": "18e66ed031ceryr9v",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5p54obh",
                "features_A": {
                    "id": "18e66ed031ceryr9v",
                    "name": "Member Query",
                    "description": "Member Query",
                    "createdAt": "2024-03-22T16:09:52.668Z",
                    "updatedAt": "2024-03-22T16:09:52.668Z",
                    "featuresMasterId": "18e66cc4eb5u4ql30"
                },
                "b_permission": [
                    {
                        "id": "18e6cb5f849en82rl",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.713Z",
                        "updatedAt": "2024-03-23T19:07:28.713Z",
                        "featuresBId": "18e671f47fbagcgfq",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sq1cdb",
                        "features_B": {
                            "id": "18e671f47fbagcgfq",
                            "name": "Account-1",
                            "description": "Account-1",
                            "createdAt": "2024-03-22T17:04:47.100Z",
                            "updatedAt": "2024-03-22T17:04:47.100Z",
                            "featuresAId": "18e66ed031ceryr9v"
                        },
                        "c_permission": [
                            {
                                "id": "18e6cb5f9fexf1h47",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.151Z",
                                "updatedAt": "2024-03-23T19:07:29.151Z",
                                "featuresCId": "18e6728da98soi9sx",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f849en82rl",
                                "features_C": {
                                    "id": "18e6728da98soi9sx",
                                    "name": "Department Creation-2",
                                    "description": "Department Creation-2",
                                    "createdAt": "2024-03-22T17:15:14.456Z",
                                    "updatedAt": "2024-03-22T17:15:14.456Z",
                                    "featuresBId": "18e671f47fbagcgfq"
                                }
                            },
                            {
                                "id": "18e6cb5f9femzewoh",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.150Z",
                                "updatedAt": "2024-03-23T19:07:29.150Z",
                                "featuresCId": "18e6728da96n7un4h",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f849en82rl",
                                "features_C": {
                                    "id": "18e6728da96n7un4h",
                                    "name": "Group Creation-2",
                                    "description": "Group Creation-2",
                                    "createdAt": "2024-03-22T17:15:14.455Z",
                                    "updatedAt": "2024-03-22T17:15:14.455Z",
                                    "featuresBId": "18e671f47fbagcgfq"
                                }
                            },
                            {
                                "id": "18e6cb5f9fenah82n",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.150Z",
                                "updatedAt": "2024-03-23T19:07:29.150Z",
                                "featuresCId": "18e6728da97j2742u",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f849en82rl",
                                "features_C": {
                                    "id": "18e6728da97j2742u",
                                    "name": "Bank Creation-2",
                                    "description": "Bank Creation-2",
                                    "createdAt": "2024-03-22T17:15:14.456Z",
                                    "updatedAt": "2024-03-22T17:15:14.456Z",
                                    "featuresBId": "18e671f47fbagcgfq"
                                }
                            },
                            {
                                "id": "18e6cb5f9fepfk58l",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.150Z",
                                "updatedAt": "2024-03-23T19:07:29.150Z",
                                "featuresCId": "18e6728da98iuybo0",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f849en82rl",
                                "features_C": {
                                    "id": "18e6728da98iuybo0",
                                    "name": "Branch Creation-2",
                                    "description": "Branch Creation-2",
                                    "createdAt": "2024-03-22T17:15:14.456Z",
                                    "updatedAt": "2024-03-22T17:15:14.456Z",
                                    "featuresBId": "18e671f47fbagcgfq"
                                }
                            },
                            {
                                "id": "18e6cb5f9ff22z7nz",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.151Z",
                                "updatedAt": "2024-03-23T19:07:29.151Z",
                                "featuresCId": "18e6728da973owk5x",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f849en82rl",
                                "features_C": {
                                    "id": "18e6728da973owk5x",
                                    "name": "Ledger Creation-2",
                                    "description": "Ledger Creation-2",
                                    "createdAt": "2024-03-22T17:15:14.455Z",
                                    "updatedAt": "2024-03-22T17:15:14.455Z",
                                    "featuresBId": "18e671f47fbagcgfq"
                                }
                            }
                        ]
                    },
                    {
                        "id": "18e6cb5f849h48ec3",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.713Z",
                        "updatedAt": "2024-03-23T19:07:28.713Z",
                        "featuresBId": "18e671f47fd39n7vl",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sq1cdb",
                        "features_B": {
                            "id": "18e671f47fd39n7vl",
                            "name": "Inward/Outward-1",
                            "description": "Inward/Outward-1",
                            "createdAt": "2024-03-22T17:04:47.101Z",
                            "updatedAt": "2024-03-22T17:04:47.101Z",
                            "featuresAId": "18e66ed031ceryr9v"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f849zqrrwb",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.713Z",
                        "updatedAt": "2024-03-23T19:07:28.713Z",
                        "featuresBId": "18e671f47fd0umkjg",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sq1cdb",
                        "features_B": {
                            "id": "18e671f47fd0umkjg",
                            "name": "SMS-1",
                            "description": "SMS-1",
                            "createdAt": "2024-03-22T17:04:47.101Z",
                            "updatedAt": "2024-03-22T17:04:47.101Z",
                            "featuresAId": "18e66ed031ceryr9v"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f8495jkhub",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.713Z",
                        "updatedAt": "2024-03-23T19:07:28.713Z",
                        "featuresBId": "18e671f47fdsyo5z6",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sq1cdb",
                        "features_B": {
                            "id": "18e671f47fdsyo5z6",
                            "name": "Setup-1",
                            "description": "Setup-1",
                            "createdAt": "2024-03-22T17:04:47.101Z",
                            "updatedAt": "2024-03-22T17:04:47.101Z",
                            "featuresAId": "18e66ed031ceryr9v"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f849639tb0",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.713Z",
                        "updatedAt": "2024-03-23T19:07:28.713Z",
                        "featuresBId": "18e671f47fdxxxib0",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sq1cdb",
                        "features_B": {
                            "id": "18e671f47fdxxxib0",
                            "name": "Security-1",
                            "description": "Security-1",
                            "createdAt": "2024-03-22T17:04:47.101Z",
                            "updatedAt": "2024-03-22T17:04:47.101Z",
                            "featuresAId": "18e66ed031ceryr9v"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f849y3u35t",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.713Z",
                        "updatedAt": "2024-03-23T19:07:28.713Z",
                        "featuresBId": "18e671f47fdbzonj6",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sq1cdb",
                        "features_B": {
                            "id": "18e671f47fdbzonj6",
                            "name": "Master-1",
                            "description": "Master-1",
                            "createdAt": "2024-03-22T17:04:47.102Z",
                            "updatedAt": "2024-03-22T17:04:47.102Z",
                            "featuresAId": "18e66ed031ceryr9v"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f849btml9t",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.713Z",
                        "updatedAt": "2024-03-23T19:07:28.713Z",
                        "featuresBId": "18e671f47feox11aq",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sq1cdb",
                        "features_B": {
                            "id": "18e671f47feox11aq",
                            "name": "YearEnd-1",
                            "description": "YearEnd-1",
                            "createdAt": "2024-03-22T17:04:47.102Z",
                            "updatedAt": "2024-03-22T17:04:47.102Z",
                            "featuresAId": "18e66ed031ceryr9v"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f849a0wdcq",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.713Z",
                        "updatedAt": "2024-03-23T19:07:28.713Z",
                        "featuresBId": "18e671f47fejfu07a",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f692sq1cdb",
                        "features_B": {
                            "id": "18e671f47fejfu07a",
                            "name": "Import-1",
                            "description": "Import-1",
                            "createdAt": "2024-03-22T17:04:47.102Z",
                            "updatedAt": "2024-03-22T17:04:47.102Z",
                            "featuresAId": "18e66ed031ceryr9v"
                        },
                        "c_permission": []
                    }
                ]
            },
            {
                "id": "18e6cb5f691l6nk2o",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.273Z",
                "updatedAt": "2024-03-23T19:07:28.273Z",
                "featuresAId": "18e66ec3b70qsxnau",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5p54obh",
                "features_A": {
                    "id": "18e66ec3b70qsxnau",
                    "name": "Master Data Entery",
                    "description": "Master Data Entery",
                    "createdAt": "2024-03-22T16:09:01.552Z",
                    "updatedAt": "2024-03-22T16:09:01.552Z",
                    "featuresMasterId": "18e66cc4eb5u4ql30"
                },
                "b_permission": [
                    {
                        "id": "18e6cb5f847ucfr8s",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.711Z",
                        "updatedAt": "2024-03-23T19:07:28.711Z",
                        "featuresBId": "18e6708aab73lu1jp",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f691l6nk2o",
                        "features_B": {
                            "id": "18e6708aab73lu1jp",
                            "name": "Setup",
                            "description": "Setup",
                            "createdAt": "2024-03-22T16:40:05.047Z",
                            "updatedAt": "2024-03-22T16:40:05.047Z",
                            "featuresAId": "18e66ec3b70qsxnau"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f847891kew",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.711Z",
                        "updatedAt": "2024-03-23T19:07:28.711Z",
                        "featuresBId": "18e67096cd1ouhxou",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f691l6nk2o",
                        "features_B": {
                            "id": "18e67096cd1ouhxou",
                            "name": "SMS",
                            "description": "SMS",
                            "createdAt": "2024-03-22T16:40:54.737Z",
                            "updatedAt": "2024-03-22T16:40:54.737Z",
                            "featuresAId": "18e66ec3b70qsxnau"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f846w6grqw",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.711Z",
                        "updatedAt": "2024-03-23T19:07:28.711Z",
                        "featuresBId": "18e670869c1gyutgl",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f691l6nk2o",
                        "features_B": {
                            "id": "18e670869c1gyutgl",
                            "name": "Account",
                            "description": "Account",
                            "createdAt": "2024-03-22T16:39:48.417Z",
                            "updatedAt": "2024-03-22T16:39:48.417Z",
                            "featuresAId": "18e66ec3b70qsxnau"
                        },
                        "c_permission": [
                            {
                                "id": "18e6cb5f9fdzz54nf",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.149Z",
                                "updatedAt": "2024-03-23T19:07:29.149Z",
                                "featuresCId": "18e671290e136i0m2",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f846w6grqw",
                                "features_C": {
                                    "id": "18e671290e136i0m2",
                                    "name": "Bank Creation",
                                    "description": "Bank Creation",
                                    "createdAt": "2024-03-22T16:50:53.793Z",
                                    "updatedAt": "2024-03-22T16:50:53.793Z",
                                    "featuresBId": "18e670869c1gyutgl"
                                }
                            },
                            {
                                "id": "18e6cb5f9fdyrhlcm",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.149Z",
                                "updatedAt": "2024-03-23T19:07:29.149Z",
                                "featuresCId": "18e67125f78sh9n50",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f846w6grqw",
                                "features_C": {
                                    "id": "18e67125f78sh9n50",
                                    "name": "Ledger Creation",
                                    "description": "Ledger Creation",
                                    "createdAt": "2024-03-22T16:50:41.144Z",
                                    "updatedAt": "2024-03-22T16:50:41.144Z",
                                    "featuresBId": "18e670869c1gyutgl"
                                }
                            },
                            {
                                "id": "18e6cb5f9fdjy5lmc",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.149Z",
                                "updatedAt": "2024-03-23T19:07:29.149Z",
                                "featuresCId": "18e671230e5w7747g",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f846w6grqw",
                                "features_C": {
                                    "id": "18e671230e5w7747g",
                                    "name": "Group Creation",
                                    "description": "Group Creation",
                                    "createdAt": "2024-03-22T16:50:29.222Z",
                                    "updatedAt": "2024-03-22T16:50:29.222Z",
                                    "featuresBId": "18e670869c1gyutgl"
                                }
                            },
                            {
                                "id": "18e6cb5f9fd5xjk63",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.149Z",
                                "updatedAt": "2024-03-23T19:07:29.149Z",
                                "featuresCId": "18e6712bbdajnfbqd",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f846w6grqw",
                                "features_C": {
                                    "id": "18e6712bbdajnfbqd",
                                    "name": "Branch Creation",
                                    "description": "Branch Creation",
                                    "createdAt": "2024-03-22T16:51:04.794Z",
                                    "updatedAt": "2024-03-22T16:51:04.794Z",
                                    "featuresBId": "18e670869c1gyutgl"
                                }
                            },
                            {
                                "id": "18e6cb5f9fdypoqj3",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.150Z",
                                "updatedAt": "2024-03-23T19:07:29.150Z",
                                "featuresCId": "18e67130ee2o9zpks",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f846w6grqw",
                                "features_C": {
                                    "id": "18e67130ee2o9zpks",
                                    "name": "Department Creation",
                                    "description": "Department Creation",
                                    "createdAt": "2024-03-22T16:51:26.050Z",
                                    "updatedAt": "2024-03-22T16:51:26.050Z",
                                    "featuresBId": "18e670869c1gyutgl"
                                }
                            }
                        ]
                    },
                    {
                        "id": "18e6cb5f847yybvhu",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.711Z",
                        "updatedAt": "2024-03-23T19:07:28.711Z",
                        "featuresBId": "18e6708f0c6aljeqm",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f691l6nk2o",
                        "features_B": {
                            "id": "18e6708f0c6aljeqm",
                            "name": "Inward/Outward",
                            "description": "Inward/Outward",
                            "createdAt": "2024-03-22T16:40:22.982Z",
                            "updatedAt": "2024-03-22T16:40:22.982Z",
                            "featuresAId": "18e66ec3b70qsxnau"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f847x4xfyx",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.711Z",
                        "updatedAt": "2024-03-23T19:07:28.711Z",
                        "featuresBId": "18e6709f18c06fwet",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f691l6nk2o",
                        "features_B": {
                            "id": "18e6709f18c06fwet",
                            "name": "Security",
                            "description": "Security",
                            "createdAt": "2024-03-22T16:41:28.716Z",
                            "updatedAt": "2024-03-22T16:41:28.716Z",
                            "featuresAId": "18e66ec3b70qsxnau"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f8477urowu",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.711Z",
                        "updatedAt": "2024-03-23T19:07:28.711Z",
                        "featuresBId": "18e670a1f923r9qnu",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f691l6nk2o",
                        "features_B": {
                            "id": "18e670a1f923r9qnu",
                            "name": "Master",
                            "description": "Master",
                            "createdAt": "2024-03-22T16:41:40.498Z",
                            "updatedAt": "2024-03-22T16:41:40.498Z",
                            "featuresAId": "18e66ec3b70qsxnau"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f847no43ul",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.712Z",
                        "updatedAt": "2024-03-23T19:07:28.712Z",
                        "featuresBId": "18e670a571691l2l7",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f691l6nk2o",
                        "features_B": {
                            "id": "18e670a571691l2l7",
                            "name": "Import",
                            "description": "Import",
                            "createdAt": "2024-03-22T16:41:54.710Z",
                            "updatedAt": "2024-03-22T16:41:54.710Z",
                            "featuresAId": "18e66ec3b70qsxnau"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f848dzt5tw",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.712Z",
                        "updatedAt": "2024-03-23T19:07:28.712Z",
                        "featuresBId": "18e670a9d4d7e32mp",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f691l6nk2o",
                        "features_B": {
                            "id": "18e670a9d4d7e32mp",
                            "name": "YearEnd",
                            "description": "YearEnd",
                            "createdAt": "2024-03-22T16:42:12.685Z",
                            "updatedAt": "2024-03-22T16:42:12.685Z",
                            "featuresAId": "18e66ec3b70qsxnau"
                        },
                        "c_permission": []
                    }
                ]
            },
            {
                "id": "18e6cb5f6925yw889",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.274Z",
                "updatedAt": "2024-03-23T19:07:28.274Z",
                "featuresAId": "18e66eca908q8sr8d",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5p54obh",
                "features_A": {
                    "id": "18e66eca908q8sr8d",
                    "name": "Member Registration",
                    "description": "Member Registration",
                    "createdAt": "2024-03-22T16:09:29.608Z",
                    "updatedAt": "2024-03-22T16:09:29.608Z",
                    "featuresMasterId": "18e66cc4eb5u4ql30"
                },
                "b_permission": [
                    {
                        "id": "18e6cb5f8483yow57",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.712Z",
                        "updatedAt": "2024-03-23T19:07:28.712Z",
                        "featuresBId": "18e671de748kl4pad",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f6925yw889",
                        "features_B": {
                            "id": "18e671de748kl4pad",
                            "name": "Account-1",
                            "description": "Account-1",
                            "createdAt": "2024-03-22T17:03:16.809Z",
                            "updatedAt": "2024-03-22T17:03:16.809Z",
                            "featuresAId": "18e66eca908q8sr8d"
                        },
                        "c_permission": [
                            {
                                "id": "18e6cb5f9fe8ivhf0",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.150Z",
                                "updatedAt": "2024-03-23T19:07:29.150Z",
                                "featuresCId": "18e67277a2agilg53",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f8483yow57",
                                "features_C": {
                                    "id": "18e67277a2agilg53",
                                    "name": "Department Creation-1",
                                    "description": "Department Creation-1",
                                    "createdAt": "2024-03-22T17:13:44.234Z",
                                    "updatedAt": "2024-03-22T17:13:44.234Z",
                                    "featuresBId": "18e671de748kl4pad"
                                }
                            },
                            {
                                "id": "18e6cb5f9fezfjwji",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.150Z",
                                "updatedAt": "2024-03-23T19:07:29.150Z",
                                "featuresCId": "18e67277a28ravhvx",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f8483yow57",
                                "features_C": {
                                    "id": "18e67277a28ravhvx",
                                    "name": "Group Creation-1",
                                    "description": "Group Creation-1",
                                    "createdAt": "2024-03-22T17:13:44.233Z",
                                    "updatedAt": "2024-03-22T17:13:44.233Z",
                                    "featuresBId": "18e671de748kl4pad"
                                }
                            },
                            {
                                "id": "18e6cb5f9fe7e1kq8",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.150Z",
                                "updatedAt": "2024-03-23T19:07:29.150Z",
                                "featuresCId": "18e67277a2aflzgn7",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f8483yow57",
                                "features_C": {
                                    "id": "18e67277a2aflzgn7",
                                    "name": "Bank Creation-1",
                                    "description": "Bank Creation-1",
                                    "createdAt": "2024-03-22T17:13:44.234Z",
                                    "updatedAt": "2024-03-22T17:13:44.234Z",
                                    "featuresBId": "18e671de748kl4pad"
                                }
                            },
                            {
                                "id": "18e6cb5f9feqhlwt1",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.150Z",
                                "updatedAt": "2024-03-23T19:07:29.150Z",
                                "featuresCId": "18e67277a29g5i2on",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f8483yow57",
                                "features_C": {
                                    "id": "18e67277a29g5i2on",
                                    "name": "Ledger Creation-1",
                                    "description": "Ledger Creation-1",
                                    "createdAt": "2024-03-22T17:13:44.234Z",
                                    "updatedAt": "2024-03-22T17:13:44.234Z",
                                    "featuresBId": "18e671de748kl4pad"
                                }
                            },
                            {
                                "id": "18e6cb5f9feqw9dks",
                                "read": false,
                                "write": false,
                                "createdAt": "2024-03-23T19:07:29.150Z",
                                "updatedAt": "2024-03-23T19:07:29.150Z",
                                "featuresCId": "18e67277a2a4hjrxy",
                                "userSystemID": "OK9IM6SGE",
                                "featuresBPermissionId": "18e6cb5f8483yow57",
                                "features_C": {
                                    "id": "18e67277a2a4hjrxy",
                                    "name": "Branch Creation-1",
                                    "description": "Branch Creation-1",
                                    "createdAt": "2024-03-22T17:13:44.234Z",
                                    "updatedAt": "2024-03-22T17:13:44.234Z",
                                    "featuresBId": "18e671de748kl4pad"
                                }
                            }
                        ]
                    },
                    {
                        "id": "18e6cb5f848lbhm1i",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.712Z",
                        "updatedAt": "2024-03-23T19:07:28.712Z",
                        "featuresBId": "18e671de74a67es7v",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f6925yw889",
                        "features_B": {
                            "id": "18e671de74a67es7v",
                            "name": "Inward/Outward-1",
                            "description": "Inward/Outward-1",
                            "createdAt": "2024-03-22T17:03:16.810Z",
                            "updatedAt": "2024-03-22T17:03:16.810Z",
                            "featuresAId": "18e66eca908q8sr8d"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f848sqlp5x",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.712Z",
                        "updatedAt": "2024-03-23T19:07:28.712Z",
                        "featuresBId": "18e671de749zltlgk",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f6925yw889",
                        "features_B": {
                            "id": "18e671de749zltlgk",
                            "name": "Setup-1",
                            "description": "Setup-1",
                            "createdAt": "2024-03-22T17:03:16.810Z",
                            "updatedAt": "2024-03-22T17:03:16.810Z",
                            "featuresAId": "18e66eca908q8sr8d"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f848bib67t",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.712Z",
                        "updatedAt": "2024-03-23T19:07:28.712Z",
                        "featuresBId": "18e671de74agd1gjo",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f6925yw889",
                        "features_B": {
                            "id": "18e671de74agd1gjo",
                            "name": "SMS-1",
                            "description": "SMS-1",
                            "createdAt": "2024-03-22T17:03:16.810Z",
                            "updatedAt": "2024-03-22T17:03:16.810Z",
                            "featuresAId": "18e66eca908q8sr8d"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f848ta48p0",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.712Z",
                        "updatedAt": "2024-03-23T19:07:28.712Z",
                        "featuresBId": "18e671de74adr8cdz",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f6925yw889",
                        "features_B": {
                            "id": "18e671de74adr8cdz",
                            "name": "Master-1",
                            "description": "Master-1",
                            "createdAt": "2024-03-22T17:03:16.810Z",
                            "updatedAt": "2024-03-22T17:03:16.810Z",
                            "featuresAId": "18e66eca908q8sr8d"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f848dv9ike",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.712Z",
                        "updatedAt": "2024-03-23T19:07:28.712Z",
                        "featuresBId": "18e671de74afgccnx",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f6925yw889",
                        "features_B": {
                            "id": "18e671de74afgccnx",
                            "name": "Security-1",
                            "description": "Security-1",
                            "createdAt": "2024-03-22T17:03:16.810Z",
                            "updatedAt": "2024-03-22T17:03:16.810Z",
                            "featuresAId": "18e66eca908q8sr8d"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f8485x8pmd",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.712Z",
                        "updatedAt": "2024-03-23T19:07:28.712Z",
                        "featuresBId": "18e671de74aa8b5mf",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f6925yw889",
                        "features_B": {
                            "id": "18e671de74aa8b5mf",
                            "name": "Import-1",
                            "description": "Import-1",
                            "createdAt": "2024-03-22T17:03:16.811Z",
                            "updatedAt": "2024-03-22T17:03:16.811Z",
                            "featuresAId": "18e66eca908q8sr8d"
                        },
                        "c_permission": []
                    },
                    {
                        "id": "18e6cb5f848smrae2",
                        "read": false,
                        "write": false,
                        "createdAt": "2024-03-23T19:07:28.712Z",
                        "updatedAt": "2024-03-23T19:07:28.712Z",
                        "featuresBId": "18e671de74b2wxd0t",
                        "userSystemID": "OK9IM6SGE",
                        "featuresAPermissionId": "18e6cb5f6925yw889",
                        "features_B": {
                            "id": "18e671de74b2wxd0t",
                            "name": "YearEnd-1",
                            "description": "YearEnd-1",
                            "createdAt": "2024-03-22T17:03:16.811Z",
                            "updatedAt": "2024-03-22T17:03:16.811Z",
                            "featuresAId": "18e66eca908q8sr8d"
                        },
                        "c_permission": []
                    }
                ]
            }
        ]
    },
    {
        "id": "18e6cb5f4a5tj01d0",
        "read": false,
        "write": false,
        "createdAt": "2024-03-23T19:07:27.781Z",
        "updatedAt": "2024-03-23T19:07:27.781Z",
        "featuresMasterId": "18e66cc7b032ysaow",
        "userSystemID": "OK9IM6SGE",
        "features_master": {
            "id": "18e66cc7b032ysaow",
            "name": "Reports",
            "description": "Reports",
            "createdAt": "2024-03-22T15:34:20.675Z",
            "updatedAt": "2024-03-22T15:34:20.675Z"
        },
        "a_permission": [
            {
                "id": "18e6cb5f695xlywbg",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.277Z",
                "updatedAt": "2024-03-23T19:07:28.277Z",
                "featuresAId": "18e66fe6084py48gd",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5tj01d0",
                "features_A": {
                    "id": "18e66fe6084py48gd",
                    "name": "Reports Viewer",
                    "description": "Reports Viewer",
                    "createdAt": "2024-03-22T16:28:50.692Z",
                    "updatedAt": "2024-03-22T16:28:50.692Z",
                    "featuresMasterId": "18e66cc7b032ysaow"
                },
                "b_permission": []
            }
        ]
    },
    {
        "id": "18e6cb5f4a5imgflt",
        "read": false,
        "write": false,
        "createdAt": "2024-03-23T19:07:27.781Z",
        "updatedAt": "2024-03-23T19:07:27.781Z",
        "featuresMasterId": "18e66ccc78ay1v044",
        "userSystemID": "OK9IM6SGE",
        "features_master": {
            "id": "18e66ccc78ay1v044",
            "name": "Account",
            "description": "Account",
            "createdAt": "2024-03-22T15:34:40.266Z",
            "updatedAt": "2024-03-22T15:34:40.266Z"
        },
        "a_permission": [
            {
                "id": "18e6cb5f6934f7enq",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.275Z",
                "updatedAt": "2024-03-23T19:07:28.275Z",
                "featuresAId": "18e66ef5bd9t7afol",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5imgflt",
                "features_A": {
                    "id": "18e66ef5bd9t7afol",
                    "name": "Bank Book",
                    "description": "Bank Book",
                    "createdAt": "2024-03-22T16:12:26.457Z",
                    "updatedAt": "2024-03-22T16:12:26.457Z",
                    "featuresMasterId": "18e66ccc78ay1v044"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f6935h1xry",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.275Z",
                "updatedAt": "2024-03-23T19:07:28.275Z",
                "featuresAId": "18e66f180f0dr4a9b",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5imgflt",
                "features_A": {
                    "id": "18e66f180f0dr4a9b",
                    "name": "Multi Purpose Receipt",
                    "description": "Multi Purpose Receipt",
                    "createdAt": "2024-03-22T16:14:47.024Z",
                    "updatedAt": "2024-03-22T16:14:47.024Z",
                    "featuresMasterId": "18e66ccc78ay1v044"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f694dfpcg4",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.276Z",
                "updatedAt": "2024-03-23T19:07:28.276Z",
                "featuresAId": "18e66f47236c2ia9i",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5imgflt",
                "features_A": {
                    "id": "18e66f47236c2ia9i",
                    "name": "Loan Import From Web Site",
                    "description": "Loan Import From Web Site",
                    "createdAt": "2024-03-22T16:17:59.862Z",
                    "updatedAt": "2024-03-22T16:17:59.862Z",
                    "featuresMasterId": "18e66ccc78ay1v044"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f6939nbqn4",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.275Z",
                "updatedAt": "2024-03-23T19:07:28.275Z",
                "featuresAId": "18e66f04f0aaf77kg",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5imgflt",
                "features_A": {
                    "id": "18e66f04f0aaf77kg",
                    "name": "Contra Entery",
                    "description": "Contra Entery",
                    "createdAt": "2024-03-22T16:13:28.714Z",
                    "updatedAt": "2024-03-22T16:13:28.714Z",
                    "featuresMasterId": "18e66ccc78ay1v044"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f694qons6j",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.276Z",
                "updatedAt": "2024-03-23T19:07:28.276Z",
                "featuresAId": "18e66f2a6cch047j5",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5imgflt",
                "features_A": {
                    "id": "18e66f2a6cch047j5",
                    "name": "Salary Processing",
                    "description": "Salary Processing",
                    "createdAt": "2024-03-22T16:16:02.252Z",
                    "updatedAt": "2024-03-22T16:16:02.252Z",
                    "featuresMasterId": "18e66ccc78ay1v044"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f692fllgs9",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.274Z",
                "updatedAt": "2024-03-23T19:07:28.274Z",
                "featuresAId": "18e66ef096brrw4mp",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5imgflt",
                "features_A": {
                    "id": "18e66ef096brrw4mp",
                    "name": "Petty Cash",
                    "description": "Petty Cash",
                    "createdAt": "2024-03-22T16:12:05.355Z",
                    "updatedAt": "2024-03-22T16:12:05.355Z",
                    "featuresMasterId": "18e66ccc78ay1v044"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f693g5iwmu",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.275Z",
                "updatedAt": "2024-03-23T19:07:28.275Z",
                "featuresAId": "18e66ef85d0nw8qyw",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5imgflt",
                "features_A": {
                    "id": "18e66ef85d0nw8qyw",
                    "name": "Cash Book",
                    "description": "Cash Book",
                    "createdAt": "2024-03-22T16:12:37.200Z",
                    "updatedAt": "2024-03-22T16:12:37.200Z",
                    "featuresMasterId": "18e66ccc78ay1v044"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f693jrb94d",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.275Z",
                "updatedAt": "2024-03-23T19:07:28.275Z",
                "featuresAId": "18e66f0188395wk27",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5imgflt",
                "features_A": {
                    "id": "18e66f0188395wk27",
                    "name": "Journal Entery",
                    "description": "Journal Entery",
                    "createdAt": "2024-03-22T16:13:14.755Z",
                    "updatedAt": "2024-03-22T16:13:14.755Z",
                    "featuresMasterId": "18e66ccc78ay1v044"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f693tjhjcl",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.275Z",
                "updatedAt": "2024-03-23T19:07:28.275Z",
                "featuresAId": "18e66f0e62bk2sp8k",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5imgflt",
                "features_A": {
                    "id": "18e66f0e62bk2sp8k",
                    "name": "Bank Reconciliation",
                    "description": "Bank Reconciliation",
                    "createdAt": "2024-03-22T16:14:07.403Z",
                    "updatedAt": "2024-03-22T16:14:07.403Z",
                    "featuresMasterId": "18e66ccc78ay1v044"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f693br3lzl",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.276Z",
                "updatedAt": "2024-03-23T19:07:28.276Z",
                "featuresAId": "18e66f23220yb6cij",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5imgflt",
                "features_A": {
                    "id": "18e66f23220yb6cij",
                    "name": "Membership Closing",
                    "description": "Membership Closing",
                    "createdAt": "2024-03-22T16:15:32.384Z",
                    "updatedAt": "2024-03-22T16:15:32.384Z",
                    "featuresMasterId": "18e66ccc78ay1v044"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f694s1z95b",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.276Z",
                "updatedAt": "2024-03-23T19:07:28.276Z",
                "featuresAId": "18e66f3620fvseway",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5imgflt",
                "features_A": {
                    "id": "18e66f3620fvseway",
                    "name": "NEFT Approval By Branch",
                    "description": "NEFT Approval By Branch",
                    "createdAt": "2024-03-22T16:16:50.191Z",
                    "updatedAt": "2024-03-22T16:16:50.191Z",
                    "featuresMasterId": "18e66ccc78ay1v044"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f694m1h3fb",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.276Z",
                "updatedAt": "2024-03-23T19:07:28.276Z",
                "featuresAId": "18e66f391554eeuns",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a5imgflt",
                "features_A": {
                    "id": "18e66f391554eeuns",
                    "name": "NEFT Approval By HO",
                    "description": "NEFT Approval By HO",
                    "createdAt": "2024-03-22T16:17:02.293Z",
                    "updatedAt": "2024-03-22T16:17:02.293Z",
                    "featuresMasterId": "18e66ccc78ay1v044"
                },
                "b_permission": []
            }
        ]
    },
    {
        "id": "18e6cb5f4a6nwnu1x",
        "read": false,
        "write": false,
        "createdAt": "2024-03-23T19:07:27.782Z",
        "updatedAt": "2024-03-23T19:07:27.782Z",
        "featuresMasterId": "18e66ccf09ak89dsu",
        "userSystemID": "OK9IM6SGE",
        "features_master": {
            "id": "18e66ccf09ak89dsu",
            "name": "Loan",
            "description": "Loan",
            "createdAt": "2024-03-22T15:34:50.779Z",
            "updatedAt": "2024-03-22T15:34:50.779Z"
        },
        "a_permission": [
            {
                "id": "18e6cb5f6941tmway",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.276Z",
                "updatedAt": "2024-03-23T19:07:28.276Z",
                "featuresAId": "18e66f600770aiitq",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a6nwnu1x",
                "features_A": {
                    "id": "18e66f600770aiitq",
                    "name": "Loan Enquiry",
                    "description": "Loan Enquiry",
                    "createdAt": "2024-03-22T16:19:41.815Z",
                    "updatedAt": "2024-03-22T16:19:41.815Z",
                    "featuresMasterId": "18e66ccf09ak89dsu"
                },
                "b_permission": []
            }
        ]
    },
    {
        "id": "18e6cb5f4a6t8h2t3",
        "read": false,
        "write": false,
        "createdAt": "2024-03-23T19:07:27.782Z",
        "updatedAt": "2024-03-23T19:07:27.782Z",
        "featuresMasterId": "18e66cd290fgviate",
        "userSystemID": "OK9IM6SGE",
        "features_master": {
            "id": "18e66cd290fgviate",
            "name": "Fixed Deposite",
            "description": "Fixed Deposite",
            "createdAt": "2024-03-22T15:35:05.231Z",
            "updatedAt": "2024-03-22T15:35:05.231Z"
        },
        "a_permission": [
            {
                "id": "18e6cb5f6944s3fvl",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.277Z",
                "updatedAt": "2024-03-23T19:07:28.277Z",
                "featuresAId": "18e66fba9ec2m11be",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a6t8h2t3",
                "features_A": {
                    "id": "18e66fba9ec2m11be",
                    "name": "FD Loan Receipt",
                    "description": "FD Loan Receipt",
                    "createdAt": "2024-03-22T16:25:52.876Z",
                    "updatedAt": "2024-03-22T16:25:52.876Z",
                    "featuresMasterId": "18e66cd290fgviate"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f694ydcx0g",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.276Z",
                "updatedAt": "2024-03-23T19:07:28.276Z",
                "featuresAId": "18e66fabd8av3y5da",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a6t8h2t3",
                "features_A": {
                    "id": "18e66fabd8av3y5da",
                    "name": "Fix Deposite Entry",
                    "description": "Fix Deposite Entry",
                    "createdAt": "2024-03-22T16:24:52.362Z",
                    "updatedAt": "2024-03-22T16:24:52.362Z",
                    "featuresMasterId": "18e66cd290fgviate"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f695rjq4ym",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.277Z",
                "updatedAt": "2024-03-23T19:07:28.277Z",
                "featuresAId": "18e66fc98bc8xofai",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a6t8h2t3",
                "features_A": {
                    "id": "18e66fc98bc8xofai",
                    "name": "FD Loan Settlment",
                    "description": "FD Settlment",
                    "createdAt": "2024-03-22T16:26:54.012Z",
                    "updatedAt": "2024-03-22T16:26:54.012Z",
                    "featuresMasterId": "18e66cd290fgviate"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f694jzklif",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.276Z",
                "updatedAt": "2024-03-23T19:07:28.276Z",
                "featuresAId": "18e66faf160fx6kkm",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a6t8h2t3",
                "features_A": {
                    "id": "18e66faf160fx6kkm",
                    "name": "Fix Deposite Payment",
                    "description": "Fix Deposite Payment",
                    "createdAt": "2024-03-22T16:25:05.632Z",
                    "updatedAt": "2024-03-22T16:25:05.632Z",
                    "featuresMasterId": "18e66cd290fgviate"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f6947gs3qv",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.276Z",
                "updatedAt": "2024-03-23T19:07:28.276Z",
                "featuresAId": "18e66fb59548z9i1f",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a6t8h2t3",
                "features_A": {
                    "id": "18e66fb59548z9i1f",
                    "name": "FD Interest Payment",
                    "description": "FD Interest Payment",
                    "createdAt": "2024-03-22T16:25:32.244Z",
                    "updatedAt": "2024-03-22T16:25:32.244Z",
                    "featuresMasterId": "18e66cd290fgviate"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f695959wks",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.277Z",
                "updatedAt": "2024-03-23T19:07:28.277Z",
                "featuresAId": "18e66fc147e92skrp",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a6t8h2t3",
                "features_A": {
                    "id": "18e66fc147e92skrp",
                    "name": "FD Registration",
                    "description": "FD Registration",
                    "createdAt": "2024-03-22T16:26:20.158Z",
                    "updatedAt": "2024-03-22T16:26:20.158Z",
                    "featuresMasterId": "18e66cd290fgviate"
                },
                "b_permission": []
            }
        ]
    },
    {
        "id": "18e6cb5f4a6qdu3ry",
        "read": false,
        "write": false,
        "createdAt": "2024-03-23T19:07:27.782Z",
        "updatedAt": "2024-03-23T19:07:27.782Z",
        "featuresMasterId": "18e66cd6261sbkrld",
        "userSystemID": "OK9IM6SGE",
        "features_master": {
            "id": "18e66cd6261sbkrld",
            "name": "Recovery",
            "description": "Recovery",
            "createdAt": "2024-03-22T15:35:19.906Z",
            "updatedAt": "2024-03-22T15:35:19.906Z"
        },
        "a_permission": [
            {
                "id": "18e6cb5f695gsf5ov",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.277Z",
                "updatedAt": "2024-03-23T19:07:28.277Z",
                "featuresAId": "18e66fd63aamzlqpc",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a6qdu3ry",
                "features_A": {
                    "id": "18e66fd63aamzlqpc",
                    "name": "Recovery Generation",
                    "description": "Recovery Generation",
                    "createdAt": "2024-03-22T16:27:45.962Z",
                    "updatedAt": "2024-03-22T16:27:45.962Z",
                    "featuresMasterId": "18e66cd6261sbkrld"
                },
                "b_permission": []
            }
        ]
    },
    {
        "id": "18e6cb5f4a6j8uvkf",
        "read": false,
        "write": false,
        "createdAt": "2024-03-23T19:07:27.782Z",
        "updatedAt": "2024-03-23T19:07:27.782Z",
        "featuresMasterId": "18e66cd9fe6batctv",
        "userSystemID": "OK9IM6SGE",
        "features_master": {
            "id": "18e66cd9fe6batctv",
            "name": "Share Certificate and Dividend",
            "description": "Share Certificate and Dividend",
            "createdAt": "2024-03-22T15:35:35.655Z",
            "updatedAt": "2024-03-22T15:35:35.655Z"
        },
        "a_permission": []
    },
    {
        "id": "18e6cb5f4a6rk35y8",
        "read": false,
        "write": false,
        "createdAt": "2024-03-23T19:07:27.782Z",
        "updatedAt": "2024-03-23T19:07:27.782Z",
        "featuresMasterId": "18e66cdd861eousmq",
        "userSystemID": "OK9IM6SGE",
        "features_master": {
            "id": "18e66cdd861eousmq",
            "name": "Document Management",
            "description": "Document Management",
            "createdAt": "2024-03-22T15:35:50.113Z",
            "updatedAt": "2024-03-22T15:35:50.113Z"
        },
        "a_permission": [
            {
                "id": "18e6cb5f695umig0w",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.277Z",
                "updatedAt": "2024-03-23T19:07:28.277Z",
                "featuresAId": "18e66ffb10aenvboy",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a6rk35y8",
                "features_A": {
                    "id": "18e66ffb10aenvboy",
                    "name": "Inward Entry",
                    "description": "Inward Entry",
                    "createdAt": "2024-03-22T16:30:16.842Z",
                    "updatedAt": "2024-03-22T16:30:16.842Z",
                    "featuresMasterId": "18e66cdd861eousmq"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f695n1inna",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.277Z",
                "updatedAt": "2024-03-23T19:07:28.277Z",
                "featuresAId": "18e66fffbb5atrsgn",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a6rk35y8",
                "features_A": {
                    "id": "18e66fffbb5atrsgn",
                    "name": "Outward Entry",
                    "description": "Outward Entry",
                    "createdAt": "2024-03-22T16:30:35.958Z",
                    "updatedAt": "2024-03-22T16:30:35.958Z",
                    "featuresMasterId": "18e66cdd861eousmq"
                },
                "b_permission": []
            }
        ]
    },
    {
        "id": "18e6cb5f4a673v0ht",
        "read": false,
        "write": false,
        "createdAt": "2024-03-23T19:07:27.783Z",
        "updatedAt": "2024-03-23T19:07:27.783Z",
        "featuresMasterId": "18e66ce113byaxm3h",
        "userSystemID": "OK9IM6SGE",
        "features_master": {
            "id": "18e66ce113byaxm3h",
            "name": "Other",
            "description": "Other",
            "createdAt": "2024-03-22T15:36:04.667Z",
            "updatedAt": "2024-03-22T15:36:04.667Z"
        },
        "a_permission": [
            {
                "id": "18e6cb5f695r67l39",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.277Z",
                "updatedAt": "2024-03-23T19:07:28.277Z",
                "featuresAId": "18e670364bf1qdmil",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a673v0ht",
                "features_A": {
                    "id": "18e670364bf1qdmil",
                    "name": "Mediclaim Entry",
                    "description": "Mediclaim Entry",
                    "createdAt": "2024-03-22T16:34:19.455Z",
                    "updatedAt": "2024-03-22T16:34:19.455Z",
                    "featuresMasterId": "18e66ce113byaxm3h"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f695whivul",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.277Z",
                "updatedAt": "2024-03-23T19:07:28.277Z",
                "featuresAId": "18e67015d469uma17",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a673v0ht",
                "features_A": {
                    "id": "18e67015d469uma17",
                    "name": "Medical Claim / Cancer Patient Aid Payment",
                    "description": "Medical Claim / Cancer Patient Aid Payment",
                    "createdAt": "2024-03-22T16:32:06.471Z",
                    "updatedAt": "2024-03-22T16:32:06.471Z",
                    "featuresMasterId": "18e66ce113byaxm3h"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f695yrcnd9",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.277Z",
                "updatedAt": "2024-03-23T19:07:28.277Z",
                "featuresAId": "18e6702d65dh63von",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a673v0ht",
                "features_A": {
                    "id": "18e6702d65dh63von",
                    "name": "Claim Entry",
                    "description": "Claim Entry",
                    "createdAt": "2024-03-22T16:33:43.005Z",
                    "updatedAt": "2024-03-22T16:33:43.005Z",
                    "featuresMasterId": "18e66ce113byaxm3h"
                },
                "b_permission": []
            },
            {
                "id": "18e6cb5f69584mpn7",
                "read": false,
                "write": false,
                "createdAt": "2024-03-23T19:07:28.277Z",
                "updatedAt": "2024-03-23T19:07:28.277Z",
                "featuresAId": "18e67027a85uib5zt",
                "userSystemID": "OK9IM6SGE",
                "featuresMasterPermissionId": "18e6cb5f4a673v0ht",
                "features_A": {
                    "id": "18e67027a85uib5zt",
                    "name": "Payment To Mentally Retarded",
                    "description": "Payment To Mentally Retarded",
                    "createdAt": "2024-03-22T16:33:19.493Z",
                    "updatedAt": "2024-03-22T16:33:19.493Z",
                    "featuresMasterId": "18e66ce113byaxm3h"
                },
                "b_permission": []
            }
        ]
    }
]




user_features_master_permissions = [
    {
        "id": "18e6cb5f4a673v0ht",
        "read": false,
        "write": false,
        "featuresMasterId": "18e66ce113byaxm3h",
        "roleId": "18e66ce113byaxm3h",
        "userSystemID": "OK9IM6SGE",
    },
    {
        "id": "18e6cb5f4a673v0ht",
        "read": false,
        "write": false,
        "featuresMasterId": "18e66ce113byaxm3h",
        "roleId": "18e66ce113byaxm3h",
        "userSystemID": "OK9IM6SGE",
    }
]

role_features_A_permissions = [
    {
        "id": "18e6cb5f4a673v0ht",
        "read": false,
        "write": false,
        "featuresAId": "18e66f391554eeuns",
        "roleId": "OK9IM6SGE",
        "featuresMasterPermissionId": "18e6cb5f4a673v0ht",
    }
]


user_feature_A_permission = [
    {
        "read": false,
        "write": false,
        "featuresAId": "18e66f391554eeuns",
        "roleId": "18e66ce113byaxm3h",
        "userSystemID": " ",
        "featuresMasterPermissionId": " ",
    }
]



[
    {
        "id": "18e84a4a19chygx0h",
        "name": "Master",
        "description": "Master",
        "childFeatureId": null,
        "createdAt": "2024-03-28T10:39:25.596Z",
        "updatedAt": "2024-03-28T10:39:25.596Z",
        "features_a": [
            {
                "id": "18e84a73e1fh9441u",
                "name": "Master Data Entery",
                "description": "Master Data Entery",
                "childFeatureId": "18e84a4a19chygx0h",
                "createdAt": "2024-03-28T10:42:16.735Z",
                "updatedAt": "2024-03-28T10:42:16.735Z",
                "features_b": [
                    {
                        "id": "18e84a7cc5ct292p1",
                        "name": "Account",
                        "description": "Account",
                        "childFeatureId": "18e84a73e1fh9441u",
                        "createdAt": "2024-03-28T10:42:53.149Z",
                        "updatedAt": "2024-03-28T10:42:53.149Z",
                        "features_c": [
                            {
                                "id": "18e84a87fa4efrp4j",
                                "name": "Group Creation",
                                "description": "Group Creation",
                                "childFeatureId": "18e84a7cc5ct292p1",
                                "createdAt": "2024-03-28T10:43:39.044Z",
                                "updatedAt": "2024-03-28T10:43:39.044Z"
                            },
                            {
                                "id": "18e84b46ddd4broqs",
                                "name": "Ledger Creation",
                                "description": "Ledger Creation",
                                "childFeatureId": "18e84a7cc5ct292p1",
                                "createdAt": "2024-03-28T10:56:40.925Z",
                                "updatedAt": "2024-03-28T10:56:40.925Z"
                            },
                            {
                                "id": "18e84b4bb0e3z52zb",
                                "name": "Bank Creation",
                                "description": "Bank Creation",
                                "childFeatureId": "18e84a7cc5ct292p1",
                                "createdAt": "2024-03-28T10:57:00.686Z",
                                "updatedAt": "2024-03-28T10:57:00.686Z"
                            },
                            {
                                "id": "18e84b4f6e0fithbr",
                                "name": "Branch Creation",
                                "description": "Branch Creation",
                                "childFeatureId": "18e84a7cc5ct292p1",
                                "createdAt": "2024-03-28T10:57:16.000Z",
                                "updatedAt": "2024-03-28T10:57:16.000Z"
                            },
                            {
                                "id": "18e84b534a879cw33",
                                "name": "Department Creation",
                                "description": "Department Creation",
                                "childFeatureId": "18e84a7cc5ct292p1",
                                "createdAt": "2024-03-28T10:57:31.816Z",
                                "updatedAt": "2024-03-28T10:57:31.816Z"
                            }
                        ]
                    },
                    {
                        "id": "18e84ad269287ea3q",
                        "name": "SetUp",
                        "description": "SetUp",
                        "childFeatureId": "18e84a73e1fh9441u",
                        "createdAt": "2024-03-28T10:48:43.923Z",
                        "updatedAt": "2024-03-28T10:48:43.923Z"
                    },
                    {
                        "id": "18e84ad4f93v06wo4",
                        "name": "Inward/Outward",
                        "description": "Inward/Outward",
                        "childFeatureId": "18e84a73e1fh9441u",
                        "createdAt": "2024-03-28T10:48:54.419Z",
                        "updatedAt": "2024-03-28T10:48:54.419Z"
                    },
                    {
                        "id": "18e84ad8bf2u2uf9k",
                        "name": "SMS",
                        "description": "SMS",
                        "childFeatureId": "18e84a73e1fh9441u",
                        "createdAt": "2024-03-28T10:49:09.874Z",
                        "updatedAt": "2024-03-28T10:49:09.874Z"
                    },
                    {
                        "id": "18e84b0bcddba369d",
                        "name": "Master",
                        "description": "Master",
                        "childFeatureId": "18e84a73e1fh9441u",
                        "createdAt": "2024-03-28T10:52:39.006Z",
                        "updatedAt": "2024-03-28T10:52:39.006Z"
                    },
                    {
                        "id": "18e84b0df2cvwpars",
                        "name": "Import",
                        "description": "Import",
                        "childFeatureId": "18e84a73e1fh9441u",
                        "createdAt": "2024-03-28T10:52:47.788Z",
                        "updatedAt": "2024-03-28T10:52:47.788Z"
                    },
                    {
                        "id": "18e84b1051fqulubq",
                        "name": "YearEnd",
                        "description": "YearEnd",
                        "childFeatureId": "18e84a73e1fh9441u",
                        "createdAt": "2024-03-28T10:52:57.503Z",
                        "updatedAt": "2024-03-28T10:52:57.503Z"
                    }
                ]
            }
        ]
    },
    {
        "id": "18e84c8056ae3vu99",
        "name": "Admin",
        "description": "Admin",
        "childFeatureId": null,
        "createdAt": "2024-03-28T11:18:04.907Z",
        "updatedAt": "2024-03-28T11:18:04.907Z"
    },
    {
        "id": "18e84c86cde61cmmh",
        "name": "Reports",
        "description": "Reports",
        "childFeatureId": null,
        "createdAt": "2024-03-28T11:18:31.391Z",
        "updatedAt": "2024-03-28T11:18:31.391Z"
    },
    {
        "id": "18e84c89179slfqgm",
        "name": "Account",
        "description": "Account",
        "childFeatureId": null,
        "createdAt": "2024-03-28T11:18:40.761Z",
        "updatedAt": "2024-03-28T11:18:40.761Z"
    },
    {
        "id": "18e84c8b6a8j448x6",
        "name": "Loan",
        "description": "Loan",
        "childFeatureId": null,
        "createdAt": "2024-03-28T11:18:50.281Z",
        "updatedAt": "2024-03-28T11:18:50.281Z"
    },
    {
        "id": "18e84c8ddd4212kv2",
        "name": "Fixed Deposite",
        "description": "Fixed Deposite",
        "childFeatureId": null,
        "createdAt": "2024-03-28T11:19:00.309Z",
        "updatedAt": "2024-03-28T11:19:00.309Z"
    },
    {
        "id": "18e84c9131ego8kdt",
        "name": "Recovery",
        "description": "Recovery",
        "childFeatureId": null,
        "createdAt": "2024-03-28T11:19:13.950Z",
        "updatedAt": "2024-03-28T11:19:13.950Z"
    },
    {
        "id": "18e84c93cebpjbxz2",
        "name": "Share Certificate and Dividend",
        "description": "Share Certificate and Dividend",
        "childFeatureId": null,
        "createdAt": "2024-03-28T11:19:24.651Z",
        "updatedAt": "2024-03-28T11:19:24.651Z"
    },
    {
        "id": "18e84c96bcbpldwwp",
        "name": "Document Management",
        "description": "Document Management",
        "childFeatureId": null,
        "createdAt": "2024-03-28T11:19:36.652Z",
        "updatedAt": "2024-03-28T11:19:36.652Z"
    },
    {
        "id": "18e84c99c33zyaaow",
        "name": "Other",
        "description": "Other",
        "childFeatureId": null,
        "createdAt": "2024-03-28T11:19:49.043Z",
        "updatedAt": "2024-03-28T11:19:49.043Z"
    }
]
