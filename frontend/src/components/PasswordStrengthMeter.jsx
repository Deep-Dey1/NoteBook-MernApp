import { Check, X } from "lucide-react";

const PasswordStrengthMeter = ({ password }) => {
  const requirements = [
    {
      test: (pwd) => pwd.length >= 7,
      text: "At least 7 characters",
    },
    {
      test: (pwd) => /[A-Z]/.test(pwd),
      text: "One uppercase letter",
    },
    {
      test: (pwd) => /[a-z]/.test(pwd),
      text: "One lowercase letter",
    },
    {
      test: (pwd) => /\d/.test(pwd),
      text: "One number",
    },
    {
      test: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      text: "One special character (!@#$%^&*...)",
    },
  ];

  const metRequirements = requirements.filter((req) => req.test(password)).length;
  const strength = (metRequirements / requirements.length) * 100;

  const getStrengthColor = () => {
    if (strength <= 40) return "bg-red-500";
    if (strength <= 70) return "bg-orange-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength <= 40) return { text: "Weak", color: "text-red-500" };
    if (strength <= 70) return { text: "Medium", color: "text-orange-500" };
    return { text: "Strong", color: "text-green-500" };
  };

  const strengthInfo = getStrengthText();

  return (
    <div className="mt-3">
      {password && (
        <>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-base-content/70">Password Strength:</span>
            <span className={`text-sm font-semibold ${strengthInfo.color}`}>
              {strengthInfo.text}
            </span>
          </div>

          {/* Strength Bar */}
          <div className="w-full bg-base-300 rounded-full h-2 mb-4">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
              style={{ width: `${strength}%` }}
            />
          </div>

          {/* Requirements Checklist */}
          <div className="space-y-2">
            {requirements.map((req, index) => {
              const isMet = req.test(password);
              return (
                <div key={index} className="flex items-start gap-2 text-sm">
                  {isMet ? (
                    <Check className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="size-4 text-base-content/40 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={isMet ? "text-green-500" : "text-base-content/60"}>
                    {req.text}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
