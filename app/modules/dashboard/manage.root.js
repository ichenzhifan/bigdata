module.exports = [
          {
            title: "系统管理",
            icon:'fa-home',
            nodes: [
              {
                title: "用户管理",
                url:'dashboard.manage.user',
                templateName:'user-manage'
              },
              {
                title: "群组管理",
                url:'dashboard.manage.group',
                templateName:'group-manage',
                root:true
              },
              {
                title: "权限管理",
                url:'dashboard.manage.authority',
                templateName:'authority-manage',
                root:true
              }
            ]
          }
        ]