$(document).ready(function() {
    // Initialize form validation
    initFormValidation();
    
    // Update profile name when form changes
    $('#firstName, #lastName').on('input', function() {
        try {
            const firstName = $('#firstName').val() || '';
            const lastName = $('#lastName').val() || '';
            $('#profile-name').text(`${firstName} ${lastName}`);
        } catch (error) {
            console.error('Error updating profile name:', error);
        }
    });
    
    // Update profile email when form changes
    $('#email').on('input', function() {
        try {
            const email = $('#email').val() || '';
            $('#profile-email').text(email);
        } catch (error) {
            console.error('Error updating profile email:', error);
        }
    });
    
    // Handle profile form submission
    $('#profile-form').on('submit', function(e) {
        e.preventDefault();
        
        try {
            if (validateForm(this)) {
                // Simulate API call
                simulateApiCall('profile', {
                    firstName: $('#firstName').val(),
                    lastName: $('#lastName').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    birthdate: $('#birthdate').val()
                });
            }
        } catch (error) {
            console.error('Error submitting profile form:', error);
        }
    });
    
    // Handle address form submission
    $('#address-form').on('submit', function(e) {
        e.preventDefault();
        
        try {
            if (validateForm(this)) {
                // Simulate API call
                simulateApiCall('address', {
                    addressLine1: $('#addressLine1').val(),
                    addressLine2: $('#addressLine2').val(),
                    city: $('#city').val(),
                    state: $('#state').val(),
                    zipCode: $('#zipCode').val(),
                    country: $('#country').val()
                });
            }
        } catch (error) {
            console.error('Error submitting address form:', error);
        }
    });
    
    // Handle password form submission
    $('#password-form').on('submit', function(e) {
        e.preventDefault();
        
        try {
            if (validateForm(this) && validatePasswordMatch()) {
                // Simulate API call
                simulateApiCall('password', {
                    currentPassword: $('#currentPassword').val(),
                    newPassword: $('#newPassword').val()
                });
            }
        } catch (error) {
            console.error('Error submitting password form:', error);
        }
    });
    
    // Handle preferences form submission
    $('#preferences-form').on('submit', function(e) {
        e.preventDefault();
        
        try {
            // Simulate API call
            simulateApiCall('preferences', {
                emailAccountUpdates: $('#emailAccountUpdates').is(':checked'),
                emailBillingNotices: $('#emailBillingNotices').is(':checked'),
                emailPromotions: $('#emailPromotions').is(':checked'),
                emailNewsletter: $('#emailNewsletter').is(':checked'),
                smsAccountAlerts: $('#smsAccountAlerts').is(':checked'),
                smsPaymentReminders: $('#smsPaymentReminders').is(':checked'),
                smsPromotions: $('#smsPromotions').is(':checked')
            });
        } catch (error) {
            console.error('Error submitting preferences form:', error);
        }
    });
    
    // Toggle two-factor authentication setup button
    $('#twoFactorAuth').on('change', function() {
        try {
            $('.btn-setup-2fa').prop('disabled', !$(this).is(':checked'));
        } catch (error) {
            console.error('Error toggling 2FA button:', error);
        }
    });
    
    // Handle two-factor authentication setup
    $('.btn-setup-2fa').on('click', function() {
        try {
            if ($('#twoFactorAuth').is(':checked')) {
                alert('Two-factor authentication setup would be initiated here.');
                // In a real implementation, this would open a modal or redirect to a setup page
            }
        } catch (error) {
            console.error('Error setting up 2FA:', error);
        }
    });
    
    // Handle change photo button
    $('.btn-change-photo').on('click', function(e) {
        e.preventDefault();
        try {
            // In a real implementation, this would open a file picker
            alert('Photo upload functionality would be implemented here.');
        } catch (error) {
            console.error('Error changing photo:', error);
        }
    });
    
    // Password confirmation validation
    $('#newPassword, #confirmPassword').on('input', function() {
        try {
            validatePasswordMatch();
        } catch (error) {
            console.error('Error validating password match:', error);
        }
    });
    
    // Function to validate password match
    function validatePasswordMatch() {
        const newPassword = $('#newPassword').val();
        const confirmPassword = $('#confirmPassword').val();
        
        if (confirmPassword && newPassword !== confirmPassword) {
            $('#confirmPassword').addClass('is-invalid');
            return false;
        } else {
            $('#confirmPassword').removeClass('is-invalid');
            return true;
        }
    }
    
    // Function to validate form
    function validateForm(form) {
        const isValid = form.checkValidity();
        
        if (!isValid) {
            $(form).addClass('was-validated');
        }
        
        return isValid;
    }
    
    // Function to initialize form validation
    function initFormValidation() {
        // Add validation classes and attributes
        $('form input[required], form select[required]').on('blur', function() {
            if (this.checkValidity()) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid').addClass('is-invalid');
            }
        });
    }
    
    // Function to simulate API call
    function simulateApiCall(formType, data) {
        // Show loading state
        const submitBtn = $(`.btn-save-${formType}`);
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin mr-1"></i> Saving...');
        submitBtn.prop('disabled', true);
        
        // Simulate API delay
        setTimeout(function() {
            // Reset button state
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
            
            // Show success message
            let successMessage = 'Your changes have been saved successfully.';
            
            switch(formType) {
                case 'profile':
                    successMessage = 'Your profile information has been updated successfully.';
                    break;
                case 'address':
                    successMessage = 'Your address information has been updated successfully.';
                    break;
                case 'password':
                    successMessage = 'Your password has been changed successfully.';
                    // Clear password fields
                    $('#currentPassword, #newPassword, #confirmPassword').val('');
                    break;
                case 'preferences':
                    successMessage = 'Your notification preferences have been updated successfully.';
                    break;
            }
            
            $('#success-message').text(successMessage);
            $('#successModal').modal('show');
            
            // In a real implementation, you would make an API call here
            /*
            $.ajax({
                url: `/api/customer/account/${formType}`,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function(response) {
                    $('#success-message').text(successMessage);
                    $('#successModal').modal('show');
                },
                error: function(error) {
                    alert('An error occurred. Please try again.');
                    console.error('API Error:', error);
                }
            });
            */
            
            console.log(`${formType} data:`, data);
        }, 1000);
    }
});
