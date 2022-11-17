package com.smart.project.web.home.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Valid
public class MemberVO {
    @NotBlank(message = "아이디를 입력하세요.")
    private String userId;
    @NotBlank(message = "비밀번호를 입력하세요.")
    private String userPw;
    private String userPwchk;
    @NotBlank(message = "이름을 입력하세요.")
    private String userName;
    private String userDate;
    @NotBlank(message = "성별을 입력하세요")
    private String userSex;
    @NotBlank(message = "핸드폰번로를 입력 해 주세요")
    private String userPhnum;
    private boolean userPolicy;

}
