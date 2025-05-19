
// Fix the incorrect type (string to number) in any form fields 
// Add Badge import at the top of the file
import { Badge } from "@/components/ui/badge";

// Ensure any numeric values use the correct type conversion
// For example, replace:
// value={formValue} with value={Number(formValue)}
// onChange={(e) => setFormValue(e.target.value)} with onChange={(e) => setFormValue(Number(e.target.value))}

// Specific line that needs fixing (line 894):
// Change from: rate: settingValue,
// To: rate: Number(settingValue),
