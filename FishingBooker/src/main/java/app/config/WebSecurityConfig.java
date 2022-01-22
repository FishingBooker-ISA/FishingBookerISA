package app.config;

import app.security.RestAuthenticationEntryPoint;
import app.security.TokenAuthenticationFilter;
import app.service.UserService;
import app.util.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    private UserService userService;

    @Autowired
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth

                .userDetailsService(userService)

                .passwordEncoder(passwordEncoder());
    }

    @Autowired
    private TokenUtils tokenUtils;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()

                .exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint).and()

                .authorizeRequests().antMatchers("/auth/**").permitAll()		// /auth/**
                .antMatchers("/api/client/verify/**").permitAll()		// /verify/**
                .antMatchers("/api/estates/search/**").permitAll()		// /estates/search/**
                .antMatchers("/api/estates/all").permitAll()		// /estates/all getEstateById
                .antMatchers("/api/estates/getEstateById").permitAll()		// /getEstateById
                .antMatchers("/api/adventures/search/**").permitAll()		// /adventures/search/**
                .antMatchers("/api/adventures/all").permitAll()		// /adventures/all
                .antMatchers("/api/adventures/getAdventureById").permitAll()		// /adventures/getAdventureById
                .antMatchers("/api/ships/search/**").permitAll()		// /ships/search/**
                .antMatchers("/api/ships/all").permitAll()		// /ships/all getNavigationTools
                .antMatchers("/api/ships/getNavigationTools").permitAll()		// /ships/getNavigationTools
                .antMatchers("/api/ships/getShipById").permitAll()		// /ships/getShipById
                .antMatchers("/api/promoActions/getAllActionsForService").permitAll()		// /promoActions/getAllActionsForService
                .antMatchers("/api/reservations/getReservationHistory").permitAll()		// /reservations/getReservationHistory
                .antMatchers("/api/unavailable/getAllUnavailablePeriods").permitAll()		// /api/unavailable/getAllUnavailablePeriods
                .antMatchers("/api/ratings/getAvgRating").permitAll()		// /ratings/getAvgRating
                .antMatchers("/api/additional/getAdditionalForService").permitAll()		// /additional/getAdditionalForService
                .antMatchers("/api/images/getImages").permitAll()		// /images/getImages
                .antMatchers("/h2-console/**").permitAll()	// /h2-console/** ako se koristi H2 baza)
                .antMatchers("/api/foo").permitAll()		// /api/foo
                .antMatchers("/api/users/**").permitAll()

                .anyRequest().authenticated().and()

                .cors().and()

                .addFilterBefore(new TokenAuthenticationFilter(tokenUtils, userService), BasicAuthenticationFilter.class);

        http.csrf().disable();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.POST, "/auth/login");

        web.ignoring().antMatchers(HttpMethod.GET, "/", "/webjars/**", "/*.html", "favicon.ico", "/**/*.html",
                "/**/*.css", "/**/*.js");
    }
}
