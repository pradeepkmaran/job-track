package com.rocketlane.careerlog.service;

import com.rocketlane.careerlog.utils.SessionInfo;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

@Service
public class SessionService {
    public SessionInfo getSessionDetails(HttpSession session) {
        String username = (String) session.getAttribute("username");
        String email = (String) session.getAttribute("email");
        if (username == null || email == null) {
            return new SessionInfo(null, null);
        }
        return new SessionInfo(username, email);
    }

    public SessionInfo invalidateSession(HttpSession session) {
        session.invalidate();
        return new SessionInfo(null, null);
    }
}
