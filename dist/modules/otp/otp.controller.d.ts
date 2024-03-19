import OtpEmailResponseDto from './dto/otp-email-response.dto';
import OtpPhoneResponseDto from './dto/otp-phone-response.dto';
import VerifyOtpDto from './dto/verify-otp.dto';
export declare class OtpController {
    private readonly otpService;
    private readonly userService;
    requestPhoneOtp(param: {
        phoneNumber: string;
    }): Promise<OtpPhoneResponseDto>;
    requestPhoneOtpResetPass(param: {
        phoneNumber: string;
    }): Promise<OtpPhoneResponseDto>;
    requestEmailOtp(param: {
        email: string;
    }): Promise<OtpEmailResponseDto>;
    verifyOtp(params: {
        username: string;
    }, body: VerifyOtpDto): Promise<boolean>;
}
