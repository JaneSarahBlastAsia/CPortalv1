$(document).ready(function() {
    // Toggle password visibility
    $('.toggle-password').on('click', function() {
        try {
            const targetId = $(this).data('target');
            const passwordInput = $('#' + targetId);
            
            if (passwordInput.length) {
                const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
                passwordInput.attr('type', type);
                
                // Toggle icon
                $(this).find('i').toggleClass('fa-eye fa-eye-slash');
            }
        } catch (error) {
            console.error('Error toggling password visibility:', error);
        }
    });
    
    // Password strength checker
    $('#newPassword').on('input', function() {
        try {
            const password = $(this).val();
            checkPasswordStrength(password);
            validatePasswordRules(password);
        } catch (error) {
            console.error('Error checking password strength:', error);
        }
    });
    
    // Check if passwords match
    $('#confirmPassword').on('input', function() {
        try {
            const confirmPassword = $(this).val();
            const newPassword = $('#newPassword').val();
            
            if (confirmPassword === newPassword) {
                $(this).removeClass('is-invalid').addClass('is-valid');
                $('#passwordMatch').hide();
            } else {
                $(this).removeClass('is-valid').addClass('is-invalid');
                $('#passwordMatch').show();
            }
        } catch (error) {
            console.error('Error checking password match:', error);
        }
    });
    
    // Form submission
    $('#passwordUpdateForm').on('submit', function(e) {
        e.preventDefault();
        
        try {
            const currentPassword = $('#currentPassword').val();
            const newPassword = $('#newPassword').val();
            const confirmPassword = $('#confirmPassword').val();
            
            // Basic validation
            if (!currentPassword || !newPassword || !confirmPassword) {
                showError('All fields are required.');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showError('New password and confirmation do not match.');
                return;
            }
            
            // Check password strength
            if (!isPasswordStrong(newPassword)) {
                showError('Your password does not meet the security requirements.');
                return;
            }
            
            // Simulate API call
            updatePassword(currentPassword, newPassword);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showError('An unexpected error occurred. Please try again.');
        }
    });
    
    // Cancel button
    $('.btn-cancel').on('click', function() {
        try {
            // Reset form
            $('#passwordUpdateForm')[0].reset();
            
            // Reset password strength indicator
            $('#passwordStrengthBar')
                .removeClass('very-weak weak medium strong very-strong')
                .css('width', '0%')
                .attr('aria-valuenow', 0);
            
            $('#passwordStrengthText').text('Password strength: Not entered');
            
            // Reset validation icons
            $('.fa-check-circle').removeClass('fa-check-circle').addClass('fa-times-circle');
            $('li span').removeClass('text-success').addClass('text-danger');
            
            // Reset password fields
            $('.form-control').removeClass('is-valid is-invalid');
            
            // Reset password visibility
            $('input[type="text"]').attr('type', 'password');
            $('.toggle-password i.fa-eye-slash').removeClass('fa-eye-slash').addClass('fa-eye');
        } catch (error) {
            console.error('Error resetting form:', error);
        }
    });
    
    // Function to check password strength
    function checkPasswordStrength(password) {
        let strength = 0;
        const strengthBar = $('#passwordStrengthBar');
        const strengthText = $('#passwordStrengthText');
        
        if (password.length === 0) {
            strengthBar.removeClass('very-weak weak medium strong very-strong')
                .css('width', '0%')
                .attr('aria-valuenow', 0);
            strengthText.text('Password strength: Not entered');
            return;
        }
        
        // Add points for length
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Add points for complexity
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update strength bar
        strengthBar.removeClass('very-weak weak medium strong very-strong');
        
        if (strength <= 2) {
            strengthBar.addClass('very-weak');
            strengthText.text('Password strength: Very Weak');
        } else if (strength <= 3) {
            strengthBar.addClass('weak');
            strengthText.text('Password strength: Weak');
        } else if (strength <= 4) {
            strengthBar.addClass('medium');
            strengthText.text('Password strength: Medium');
        } else if (strength <= 5) {
            strengthBar.addClass('strong');
            strengthText.text('Password strength: Strong');
        } else {
            strengthBar.addClass('very-strong');
            strengthText.text('Password strength: Very Strong');
        }
    }
    
    // Function to validate password rules
    function validatePasswordRules(password) {
        // Check length
        if (password.length >= 8) {
            $('#length-check span').removeClass('text-danger').addClass('text-success')
                .html('<i class="fas fa-check-circle"></i>');
        } else {
            $('#length-check span').removeClass('text-success').addClass('text-danger')
                .html('<i class="fas fa-times-circle"></i>');
        }
        
        // Check uppercase
        if (/[A-Z]/.test(password)) {
            $('#uppercase-check span').removeClass('text-danger').addClass('text-success')
                .html('<i class="fas fa-check-circle"></i>');
        } else {
            $('#uppercase-check span').removeClass('text-success').addClass('text-danger')
                .html('<i class="fas fa-times-circle"></i>');
        }
        
        // Check lowercase
        if (/[a-z]/.test(password)) {
            $('#lowercase-check span').removeClass('text-danger').addClass('text-success')
                .html('<i class="fas fa-check-circle"></i>');
        } else {
            $('#lowercase-check span').removeClass('text-success').addClass('text-danger')
                .html('<i class="fas fa-times-circle"></i>');
        }
        
        // Check number
        if (/[0-9]/.test(password)) {
            $('#number-check span').removeClass('text-danger').addClass('text-success')
                .html('<i class="fas fa-check-circle"></i>');
        } else {
            $('#number-check span').removeClass('text-success').addClass('text-danger')
                .html('<i class="fas fa-times-circle"></i>');
        }
        
        // Check special character
        if (/[^A-Za-z0-9]/.test(password)) {
            $('#special-check span').removeClass('text-danger').addClass('text-success')
                .html('<i class="fas fa-check-circle"></i>');
        } else {
            $('#special-check span').removeClass('text-success').addClass('text-danger')
                .html('<i class="fas fa-times-circle"></i>');
        }
    }
    
    // Function to check if password is strong enough
    function isPasswordStrong(password) {
        return password.length >= 8 && 
               /[A-Z]/.test(password) && 
               /[a-z]/.test(password) && 
               /[0-9]/.test(password) && 
               /[^A-Za-z0-9]/.test(password);
    }
    
    // Function to update password (simulated API call)
    function updatePassword(currentPassword, newPassword) {
        // Simulate API call with timeout
        setTimeout(function() {
            try {
                // For demo purposes, we'll simulate a successful update
                // In a real application, you would make an API call here
                
                /*
                // Actual API call would look something like this:
                $.ajax({
                    url: '/api/customer/update-password',
                    type: 'POST',
                    data: {
                        currentPassword: currentPassword,
                        newPassword: newPassword
                    },
                    success: function(response) {
                        if (response.success) {
                            showSuccess();
                        } else {
                            showError(response.message || 'Failed to update password.');
                        }
                    },
                    error: function(xhr, status, error) {
                        showError('Server error. Please try again later.');
                    }
                });
                */
                
                // For demo, show success
                showSuccess();
                
                // Uncomment to simulate an error instead
                // showError('Current password is incorrect.');
                
            } catch (error) {
                console.error('Error in updatePassword:', error);
                showError('An unexpected error occurred. Please try again.');
            }
        }, 1000);
    }
    
    // Function to show success modal
    function showSuccess() {
        $('#successModal').modal('show');
        
        // Reset form after success
        $('#passwordUpdateForm')[0].reset();
        
        // Reset password strength indicator
        $('#passwordStrengthBar')
            .removeClass('very-weak weak medium strong very-strong')
            .css('width', '0%')
            .attr('aria-valuenow', 0);
        
        $('#passwordStrengthText').text('Password strength: Not entered');
        
        // Reset validation icons
        $('.fa-check-circle').removeClass('fa-check-circle').addClass('fa-times-circle');
        $('li span').removeClass('text-success').addClass('text-danger');
        
        // Reset password fields
        $('.form-control').removeClass('is-valid is-invalid');
    }
    
    // Function to show error modal
    function showError(message) {
        $('#errorMessage').text(message || 'There was an error updating your password. Please try again.');
        $('#errorModal').modal('show');
    }
});
