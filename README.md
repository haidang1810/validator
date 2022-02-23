# example
<!doctype html>
<html lang="en">
    <head>
        <title>Login</title>
        <meta charset="utf-8">
    </head>
    <body>
        <form method="POST" class="form-login">
            <h1 class="form__title">Sign up</h1>
            <div class="form-group">
                <label for="fullName">Full name</label>
                <input type="text" id="fullName" rules='required' name="fullName" class="form-control" placeholder="Enter full name...">
                <span class="form-message"></span>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" id="email" rules='email' name="email" class="form-control" placeholder="Enter email...">
                <span class="form-message"></span>
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input type="text" id="password" rules='required|min:4|max:20' name="password" class="form-control" placeholder="Enter password...">
                <span class="form-message"></span>
            </div>
            <button type="submit" class="btn btn-block btn-primary mb-2">Đăng nhập</button>
        </form>
        <script src="../shared/validator.js" type="text/javascript"></script>
        <script>
            validator('.form-login',{
                formGroup: '.form-group',
                formMessage: '.form-message',
                onSubmit: function(){
                    console.log("submit");
                }
            });
        </script>
    </body>
</html>
