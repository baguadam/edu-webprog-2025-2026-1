<?php
class Auth {
    private $user_storage;
    private $user = NULL;

    public function __construct(IStorage $user_storage) 
    {
        $this->user_storage = $user_storage;
        if (isset($_SESSION['user'])) {
            $this->user = $_SESSION['user'];
        }
    }

    public function register($data) {
        $user = [
            'username' => $data['username'],
            'password' => password_hash($data['password'], PASSWORD_DEFAULT),
            'fullname' => $data['fullname'],
            'roles'    => ['user']
        ];
        return $this->user_storage->add($user);
    }

    public function user_exists($username) {
        $user = $this->user_storage->findOne(['username' => $username]);
        return $user !== NULL;
    }

    public function authenticate($username, $password) {
        $users = $this->user_storage->findMany(function ($user) use ($username, $password) {
            return $user['username'] === $username && password_verify($password, $user['password']);
        });

        return count($users) === 1 ? array_shift($users) : NULL;
    }

    public function login($user) {
        $this->user = $user;
        $_SESSION['user'] = $user;
    }

    public function logout() {
        $this->user = NULL;
        unset($_SESSION['user']);
    }

    public function is_authenticated() {
        return $this->user !== NULL;
    }

    public function authorize($roles = []) {
        if (!$this->is_authenticated()) {
            return false;
        }

        foreach ($roles as $role) {
            if (in_array($role, $this->user['roles'])) {
                return true;
            }
        }

        return false;
    }

    public function authenticated_user() {
        return $this->user;
    }
}