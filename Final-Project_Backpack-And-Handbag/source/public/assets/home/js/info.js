        function InValidateForm() // Check form login
        {
            var email = document.getElementById('email').value; 
            var password = document.getElementById('pswd').value; 
            if (email == '') 
            { 
                alert('Bạn chưa nhập email'); 
            } else if (password == '') 
            {
             alert('Bạn chưa nhập mật khẩu'); 
         } else
         { 
            return true; 
        }
        return false;
    }
        function UpValidateForm() //Check form đăng kí
        {  
            var email_signup = document.getElementById('email-signup').value; 
            var password_signup = document.getElementById('pswd-signup').value; 
            var username_signup = document.getElementById('username-signup').value; 
            var re_pswd_signup = document.getElementById('re-pswd-signup').value; 
            var birday_signup = new Date(document.getElementById('birday-signup').value);
            var max_birday_signup_legit = new Date(2010,01,01);
            var min_birday_signup_legit = new Date(1900,01,01);
            var gender_signup = document.getElementById('gender-signup').value;
            var phoneNum_signup = document.getElementById('phoneNum-signup').value;  
            var username_validate=/^[0-9a-zA-Z_.-]+$/.test(username_signup);
            var term_signup = document.getElementById("term-signup").checked;
            if (email_signup == '') 
            { 
                alert('Bạn chưa nhập email'); 
            }
            else if (username_signup == '') 
            {
                alert('Bạn chưa nhập tên'); 
            }
            else if(!username_validate)
            {
                alert('Tên đăng nhập không hợp lệ');
            }      
            else if (password_signup == '') 
            {
                alert('Bạn chưa nhập mật khẩu'); 
            }
            else if (password_signup !==re_pswd_signup)
            { 
                alert('Bạn chưa nhập mật khẩu lại trùng khớp'); 
            }
            else if($("#birday-signup").val() == "")
            {
                alert("Bạn chưa nhập năm sinh");
            }
            else if(birday_signup>max_birday_signup_legit )
            {
                alert('Năm không hợp lệ (tuổi quá nhỏ)');
            }  
            else if(birday_signup<min_birday_signup_legit)
            {
                alert('Năm không hợp lệ (tuổi quá lớn)');
            }
            else if(phoneNum_signup=='')
            {
                alert('Bạn chưa nhập số điện thoại');
            }
            else if( gender_signup== 'none') 
            {
                alert('Bạn chưa nhập giới tính');
            } 
            else if(!term_signup)
            {
                alert('Bạn chưa đồng ý với điều khoản');
            } 
            else
            { 
                return true; 
            }
            return false;
		}