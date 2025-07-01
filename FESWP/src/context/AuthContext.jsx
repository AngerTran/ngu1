import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;

    try {
      const parsed = JSON.parse(storedUser);
      if (!parsed.token) return null;

      const decoded = jwtDecode(parsed.token);
      return {
        ...parsed,
        id: decoded.userId || decoded.Id || decoded.id || parsed.id,
        role: decoded.Role || decoded.role || parsed.role,
        name: decodeURIComponent(escape(decoded.Name || decoded.name || parsed.name || parsed.email)),
        authorities: decoded.authorities || parsed.authorities || []
      };
    } catch (err) {
      console.error("Lỗi giải mã JWT:", err);
      return null;
    }
  });

  const [profile, setProfile] = useState(null); // 👈 Thêm dòng này

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
