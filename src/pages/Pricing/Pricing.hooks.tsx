import { useNavigate } from "react-router";
import { UiService } from "../../services";
const usePricing = () => {
  const { purchasePlan } = UiService();

  return {
    purchasePlan,
  };
};

export default usePricing;
