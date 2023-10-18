import { toastTemplate } from "./templates.js";

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Toast = {
  danger(message) {
    createToast(message, "danger");
  },

  success(message) {
    createToast(message, "success");
  },

  info(message) {
    createToast(message, "info");
  },
};

export function createToast(message, bg) {
  const toast = $(toastTemplate(message, bg));
  toast.toast("show");
  $(".toast-container").append(toast);

  setTimeout(() => {
    toast.remove();
  }, 5000);
}

export function createActionMilestoneMethods($button) {
  return {
    onStart(msg) {
      $button.prop("disabled", true);
      $button.css("cursor", "not-allowed");
      // Toast.info(msg || "Action in progress...");
    },

    onSuccess(msg) {
      $button.prop("disabled", false);
      $button.css("cursor", "pointer");
      Toast.success(msg || "Action completed successfully!");
    },

    onError(error, msg) {
      $button.prop("disabled", false);
      $button.css("cursor", "pointer");
      Toast.danger(msg || `Action failed! ${error.message}`);
    },
  };
}

export function createActionForButton(selector, action) {
  $(selector).on("click", (event) => {
    const $button = $(event.target).is("button") ? $(event.target) : $(event.target).closest("button");

    if ($button.prop("disabled")) {
      return;
    }

    $button.prop("disabled", true);
    $button.css("cursor", "not-allowed");

    const { onStart, onSuccess, onError } = createActionMilestoneMethods($button);
    action(onStart, onSuccess, onError, $button);
  });
}
