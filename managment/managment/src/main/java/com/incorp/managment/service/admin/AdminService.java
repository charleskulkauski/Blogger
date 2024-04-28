package com.incorp.managment.service.admin;

import com.incorp.managment.model.Admin;
import com.incorp.managment.repository.AdminRepository;
import com.incorp.managment.security.jwt.GerenciadorTokenJwt;
import com.incorp.managment.service.admin.autenticacao.AdminTokenDto;
import com.incorp.managment.service.admin.dto.AdminLoginDto;
import com.incorp.managment.service.admin.dto.AdminMapper;
import com.incorp.managment.service.admin.dto.CriarAdminDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AdminService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private GerenciadorTokenJwt gerenciadorTokenJwt;

    @Autowired
    private AuthenticationManager authenticationManager;


    public Admin criar(CriarAdminDto criarAdminDto){
            System.out.println("criar admindto recebido: " + criarAdminDto.toString());

            final Admin novoAdmin = AdminMapper.of(criarAdminDto);
            String senhaCriptografada = passwordEncoder.encode(novoAdmin.getPassword());
            novoAdmin.setPassword(senhaCriptografada);


            return this.adminRepository.save(novoAdmin);

    }

    public AdminTokenDto autenticar(AdminLoginDto adminLoginDto){

        final UsernamePasswordAuthenticationToken credentials = new UsernamePasswordAuthenticationToken(
                adminLoginDto.getEmail(), adminLoginDto.getSenha());
        final Authentication authentication = this.authenticationManager.authenticate(credentials);

        Admin adminAutenticado =
                adminRepository.findByEmail(adminLoginDto.getEmail())
                        .orElseThrow(() -> new ResponseStatusException(404, "Email do usuário não cadastrado", null)
                        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        final String token = gerenciadorTokenJwt.generateToken(authentication);
        System.out.println(token.toString());
        return AdminMapper.of(adminAutenticado, token);
    }
}
