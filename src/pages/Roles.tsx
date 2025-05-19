
import { useState } from "react";
import { PageHeader, PageHeaderCreateButton } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Users, Plus, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Mock data for user roles
const mockRoles = [
  {
    id: "role-1",
    name: "Administrator",
    description: "Full access to all features and settings",
    usersCount: 3,
    permissions: {
      dashboard: { view: true, edit: true },
      products: { view: true, create: true, edit: true, delete: true },
      orders: { view: true, edit: true, process: true },
      customers: { view: true, edit: true, delete: true },
      discounts: { view: true, create: true, edit: true, delete: true },
      reports: { view: true, export: true },
      settings: { view: true, edit: true },
    },
    isSystem: true,
  },
  {
    id: "role-2",
    name: "Store Manager",
    description: "Manage products, orders, and customers",
    usersCount: 5,
    permissions: {
      dashboard: { view: true, edit: false },
      products: { view: true, create: true, edit: true, delete: false },
      orders: { view: true, edit: true, process: true },
      customers: { view: true, edit: true, delete: false },
      discounts: { view: true, create: true, edit: true, delete: false },
      reports: { view: true, export: true },
      settings: { view: false, edit: false },
    },
    isSystem: true,
  },
  {
    id: "role-3",
    name: "Customer Support",
    description: "View and process orders, manage customers",
    usersCount: 8,
    permissions: {
      dashboard: { view: true, edit: false },
      products: { view: true, create: false, edit: false, delete: false },
      orders: { view: true, edit: true, process: true },
      customers: { view: true, edit: true, delete: false },
      discounts: { view: true, create: false, edit: false, delete: false },
      reports: { view: false, export: false },
      settings: { view: false, edit: false },
    },
    isSystem: true,
  },
  {
    id: "role-4",
    name: "Content Editor",
    description: "Manage products and content",
    usersCount: 4,
    permissions: {
      dashboard: { view: true, edit: false },
      products: { view: true, create: true, edit: true, delete: false },
      orders: { view: false, edit: false, process: false },
      customers: { view: false, edit: false, delete: false },
      discounts: { view: true, create: false, edit: false, delete: false },
      reports: { view: false, export: false },
      settings: { view: false, edit: false },
    },
    isSystem: false,
  },
  {
    id: "role-5",
    name: "Analytics Team",
    description: "View reports and analytics",
    usersCount: 2,
    permissions: {
      dashboard: { view: true, edit: false },
      products: { view: true, create: false, edit: false, delete: false },
      orders: { view: true, edit: false, process: false },
      customers: { view: true, edit: false, delete: false },
      discounts: { view: true, create: false, edit: false, delete: false },
      reports: { view: true, export: true },
      settings: { view: false, edit: false },
    },
    isSystem: false,
  },
];

// Mock data for users
const mockUsers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    role: "Administrator",
    lastActive: "2025-05-18T10:30:00Z",
    status: "active",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Store Manager",
    lastActive: "2025-05-17T14:45:00Z",
    status: "active",
  },
  {
    id: "user-3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Customer Support",
    lastActive: "2025-05-18T09:15:00Z",
    status: "active",
  },
  {
    id: "user-4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Content Editor",
    lastActive: "2025-05-16T16:20:00Z",
    status: "active",
  },
  {
    id: "user-5",
    name: "David Brown",
    email: "david@example.com",
    role: "Analytics Team",
    lastActive: "2025-05-15T11:10:00Z",
    status: "inactive",
  },
  {
    id: "user-6",
    name: "Lisa Chen",
    email: "lisa@example.com",
    role: "Store Manager",
    lastActive: "2025-05-18T08:45:00Z",
    status: "active",
  },
];

export default function Roles() {
  const [activeTab, setActiveTab] = useState("roles");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [showPermissions, setShowPermissions] = useState(null);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: {
      dashboard: { view: true, edit: false },
      products: { view: true, create: false, edit: false, delete: false },
      orders: { view: true, edit: false, process: false },
      customers: { view: true, edit: false, delete: false },
      discounts: { view: true, create: false, edit: false, delete: false },
      reports: { view: true, export: false },
      settings: { view: false, edit: false },
    },
  });
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Customer Support",
    password: "",
    confirmPassword: "",
  });
  const { toast } = useToast();

  const filteredRoles = mockRoles.filter((role) => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = mockUsers.filter((user) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = () => {
    if (!newRole.name) {
      toast({
        title: "Invalid role",
        description: "Please provide a role name.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Role created",
      description: `${newRole.name} role has been created successfully.`,
    });
    
    setIsAddRoleOpen(false);
    setNewRole({
      name: "",
      description: "",
      permissions: {
        dashboard: { view: true, edit: false },
        products: { view: true, create: false, edit: false, delete: false },
        orders: { view: true, edit: false, process: false },
        customers: { view: true, edit: false, delete: false },
        discounts: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, export: false },
        settings: { view: false, edit: false },
      },
    });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Invalid user information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "User created",
      description: `${newUser.name} has been added successfully with ${newUser.role} role.`,
    });
    
    setIsAddUserOpen(false);
    setNewUser({
      name: "",
      email: "",
      role: "Customer Support",
      password: "",
      confirmPassword: "",
    });
  };

  const togglePermissionView = (roleId) => {
    setShowPermissions(showPermissions === roleId ? null : roleId);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="User Roles & Permissions" 
        description="Manage access control for admin users"
        actions={
          <div className="flex gap-2">
            {activeTab === "roles" ? (
              <PageHeaderCreateButton onClick={() => setIsAddRoleOpen(true)}>
                <Shield className="mr-2 h-4 w-4" /> Create Role
              </PageHeaderCreateButton>
            ) : (
              <PageHeaderCreateButton onClick={() => setIsAddUserOpen(true)}>
                <Users className="mr-2 h-4 w-4" /> Add User
              </PageHeaderCreateButton>
            )}
          </div>
        }
      />
      
      <div className="flex mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "roles"
                ? "bg-primary text-primary-foreground"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border border-gray-200 rounded-l-md`}
            onClick={() => setActiveTab("roles")}
          >
            <Shield className="inline-block mr-2 h-4 w-4" />
            Roles & Permissions
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "users"
                ? "bg-primary text-primary-foreground"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border border-gray-200 rounded-r-md`}
            onClick={() => setActiveTab("users")}
          >
            <Users className="inline-block mr-2 h-4 w-4" />
            Admin Users
          </button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Input 
            type="text" 
            placeholder={activeTab === "roles" ? "Search roles..." : "Search users..."} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      {activeTab === "roles" && (
        <div className="space-y-4">
          {filteredRoles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No roles found
            </div>
          ) : (
            filteredRoles.map((role) => (
              <Card key={role.id} className={showPermissions === role.id ? "border-primary" : ""}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center">
                        {role.name}
                        {role.isSystem && (
                          <Badge variant="outline" className="ml-2">
                            System
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{role.usersCount} users</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            if (!role.isSystem) {
                              setEditingRole(role);
                              toast({
                                title: "Edit role",
                                description: `Opening editor for ${role.name} role.`,
                              });
                            } else {
                              toast({
                                title: "Cannot modify system role",
                                description: "System roles cannot be edited.",
                                variant: "destructive",
                              });
                            }
                          }}>
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => togglePermissionView(role.id)}>
                            {showPermissions === role.id ? "Hide Permissions" : "View Permissions"}
                          </DropdownMenuItem>
                          {!role.isSystem && (
                            <DropdownMenuItem className="text-destructive" onClick={() => {
                              toast({
                                title: "Role deleted",
                                description: `${role.name} role has been deleted.`,
                              });
                            }}>
                              Delete Role
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => togglePermissionView(role.id)}
                    className="mt-2"
                  >
                    {showPermissions === role.id ? "Hide Permissions" : "View Permissions"}
                  </Button>
                  
                  {showPermissions === role.id && (
                    <div className="mt-4 border rounded-md">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="p-2 text-left">Module</th>
                            <th className="p-2 text-center">View</th>
                            <th className="p-2 text-center">Create</th>
                            <th className="p-2 text-center">Edit</th>
                            <th className="p-2 text-center">Delete</th>
                            <th className="p-2 text-center">Other</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(role.permissions).map(([module, perms]) => (
                            <tr key={module} className="border-b last:border-0">
                              <td className="p-2 font-medium capitalize">{module}</td>
                              <td className="p-2 text-center">
                                {perms.view ? <Check className="mx-auto h-4 w-4 text-green-500" /> : <X className="mx-auto h-4 w-4 text-gray-300" />}
                              </td>
                              <td className="p-2 text-center">
                                {perms.create !== undefined ? 
                                  (perms.create ? <Check className="mx-auto h-4 w-4 text-green-500" /> : <X className="mx-auto h-4 w-4 text-gray-300" />) : 
                                  "—"}
                              </td>
                              <td className="p-2 text-center">
                                {perms.edit !== undefined ? 
                                  (perms.edit ? <Check className="mx-auto h-4 w-4 text-green-500" /> : <X className="mx-auto h-4 w-4 text-gray-300" />) : 
                                  "—"}
                              </td>
                              <td className="p-2 text-center">
                                {perms.delete !== undefined ? 
                                  (perms.delete ? <Check className="mx-auto h-4 w-4 text-green-500" /> : <X className="mx-auto h-4 w-4 text-gray-300" />) : 
                                  "—"}
                              </td>
                              <td className="p-2 text-center">
                                {module === "orders" && perms.process !== undefined ? 
                                  (perms.process ? "Process orders" : "—") : 
                                  module === "reports" && perms.export !== undefined ?
                                  (perms.export ? "Export data" : "—") :
                                  "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      )}
      
      {activeTab === "users" && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            toast({
                              title: "Edit user",
                              description: `Opening editor for ${user.name}.`,
                            });
                          }}>
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            toast({
                              title: "Change role",
                              description: `Opening role selector for ${user.name}.`,
                            });
                          }}>
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            toast({
                              title: "Reset password",
                              description: `Password reset email sent to ${user.name}.`,
                            });
                          }}>
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => {
                            toast({
                              title: user.status === "active" ? "User deactivated" : "User activated",
                              description: `${user.name} has been ${user.status === "active" ? "deactivated" : "activated"}.`,
                            });
                          }}>
                            {user.status === "active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Add Role Dialog */}
      <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">Role Name</Label>
              <Input
                id="roleName"
                placeholder="e.g. Product Manager"
                value={newRole.name}
                onChange={(e) => setNewRole({...newRole, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleDescription">Description</Label>
              <Input
                id="roleDescription"
                placeholder="e.g. Manages products and inventory"
                value={newRole.description}
                onChange={(e) => setNewRole({...newRole, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2 pt-2">
              <Label>Permissions</Label>
              <Card>
                <CardContent className="p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Module</th>
                        <th className="p-2 text-center">View</th>
                        <th className="p-2 text-center">Create</th>
                        <th className="p-2 text-center">Edit</th>
                        <th className="p-2 text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(newRole.permissions).map(([module, perms]) => (
                        <tr key={module} className="border-b last:border-0">
                          <td className="p-2 font-medium capitalize">{module}</td>
                          <td className="p-2 text-center">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300" 
                              checked={perms.view || false}
                              onChange={(e) => {
                                setNewRole({
                                  ...newRole,
                                  permissions: {
                                    ...newRole.permissions,
                                    [module]: {
                                      ...newRole.permissions[module],
                                      view: e.target.checked
                                    }
                                  }
                                });
                              }}
                            />
                          </td>
                          <td className="p-2 text-center">
                            {perms.create !== undefined ? (
                              <input 
                                type="checkbox" 
                                className="rounded border-gray-300" 
                                checked={perms.create || false}
                                onChange={(e) => {
                                  setNewRole({
                                    ...newRole,
                                    permissions: {
                                      ...newRole.permissions,
                                      [module]: {
                                        ...newRole.permissions[module],
                                        create: e.target.checked
                                      }
                                    }
                                  });
                                }}
                              />
                            ) : "—"}
                          </td>
                          <td className="p-2 text-center">
                            {perms.edit !== undefined ? (
                              <input 
                                type="checkbox" 
                                className="rounded border-gray-300" 
                                checked={perms.edit || false}
                                onChange={(e) => {
                                  setNewRole({
                                    ...newRole,
                                    permissions: {
                                      ...newRole.permissions,
                                      [module]: {
                                        ...newRole.permissions[module],
                                        edit: e.target.checked
                                      }
                                    }
                                  });
                                }}
                              />
                            ) : "—"}
                          </td>
                          <td className="p-2 text-center">
                            {perms.delete !== undefined ? (
                              <input 
                                type="checkbox" 
                                className="rounded border-gray-300" 
                                checked={perms.delete || false}
                                onChange={(e) => {
                                  setNewRole({
                                    ...newRole,
                                    permissions: {
                                      ...newRole.permissions,
                                      [module]: {
                                        ...newRole.permissions[module],
                                        delete: e.target.checked
                                      }
                                    }
                                  });
                                }}
                              />
                            ) : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRole}>
              <Shield className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Admin User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Full Name</Label>
              <Input
                id="userName"
                placeholder="e.g. John Smith"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userEmail">Email Address</Label>
              <Input
                id="userEmail"
                type="email"
                placeholder="e.g. john@example.com"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userRole">Role</Label>
              <select
                id="userRole"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              >
                {mockRoles.map(role => (
                  <option key={role.id} value={role.name}>{role.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="userPassword">Password</Label>
              <Input
                id="userPassword"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userConfirmPassword">Confirm Password</Label>
              <Input
                id="userConfirmPassword"
                type="password"
                value={newUser.confirmPassword}
                onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>
              <Users className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
