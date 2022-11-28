package com.smart.project.web.home.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.Collection;
import java.util.Collections;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Valid
public class MemberVO implements UserDetails {
    @NotBlank(message = "아이디를 입력하세요.")
    private String userId;
    @NotBlank(message = "비밀번호를 입력해주세요")
    private String userPw;
    private String userPwchk;
    @NotBlank(message = "이름을 입력하세요.")
    private String userName;
    private String userDate;
    @NotBlank(message = "성별을 입력하세요")
    private String userSex;
    @NotBlank(message = "핸드폰번로를 입력 해 주세요")
    private String userPhnum;
    private String userAuth;
    private boolean userPolicy;
    private String appendDate;
    private String updateDate;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(this.userAuth));
    }

    @Override
    public String getPassword() {
        return this.userPw;
    }

    // 시큐리티의 userName
    // -> 따라서 얘는 인증할 때 id를 봄
    @Override
    public String getUsername() {
        return this.userId;
    }

    // Vo의 userName !
    public String getUserName(){
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
