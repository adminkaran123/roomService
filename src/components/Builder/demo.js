$(".slide-step").click(function () {
  var index = $(this).index();
  $(this).addClass("active");
  $(this).nextAll(".slide-step").removeClass("active");
  $(this).prevAll(".slide-step").addClass("active");
  $(this)
    .closest(".slider-inline-main-wrapper")
    .find(".slide-box")
    .eq(index)
    .addClass("active");
  $(this)
    .closest(".slider-inline-main-wrapper")
    .find(".slide-box")
    .eq(index)
    .siblings(".slide-box")
    .removeClass("active");
});

$(document).ready(function () {
  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});

var storedProprties;
$.ajax({
  type: "get",
  url: "/_hcms/api/get_wedding_properties",
  contentType: "application/json; charset=utf-8",
  traditional: true,
  success: function (data) {
    storedProprties = data;
    $(".fixed-loader").removeClass("active");
    $(".slide-box-wrapper").each(function () {
      data
        .filter((item) => item.fieldType === "checkbox")
        .map((item) => {
          var className = item.name;
          if ($(this).find(".property_internal." + className).length) {
            var value = $(this)
              .find(".property_internal." + className)
              .text();
            var valueParse = value.replace("[", "").replace("]", "");
            $(this)
              .find(".property_internal." + className)
              .text(valueParse);
          }
        });

      $(".slider-inline-item").each(function () {
        var getId = "#" + $(this).attr("id");
        var title = $(this).find(".slider-inline-header").text();
        var properties = $(this).find(".property_internal");
        $(getId + " .step-inline-form .property-group").empty();
        propertiesObj = {};
        properties.each(function () {
          var name = $(this).attr("data-name");
          var mappedGoogle = $(this).attr("data-google");
          console.log('date-google="' + mappedGoogle + '"');

          var parentName = $(this).attr("data-parent-name");

          var label = $(this).prev("strong").html();
          var value = $(this).text().trim();
          var required = $(this).attr("data-required") === "true";
          var type = storedProprties.find(
            (property) => property.name === name
          )?.fieldType;

          if (type === "checkbox") {
            type = "multi-checkbox";
          }
          if (type === "booleancheckbox") {
            type = "checkbox";
          }
          if (name) {
            propertiesObj[name] = value;
          }
          if (type === "multi-checkbox") {
            //propertiesObj[name] = array?.join(';');
          }
          var depended = $(this).hasClass("is-dependent");
          var dependClass = $(this).hasClass("parent_depender")
            ? "cm-input parent_depender " + type
            : $(this).hasClass("is-dependent")
            ? "cm-input is-dependent " + parentName + " " + type
            : "cm-input " + type;
          if (
            type !== "select" &&
            type !== "multi-checkbox" &&
            type !== "textarea" &&
            type !== "radio" &&
            type !== "file"
          ) {
            $(getId + " .step-inline-form .property-group").append(
              '<div class="' +
                dependClass +
                '  input-group"><label>' +
                label +
                '</label><input date-google="' +
                mappedGoogle +
                '"  type="' +
                type +
                '" name=' +
                name +
                "></div>"
            );
            $(getId + " .step-inline-form .property-group")
              .find('input[name="' + name + '"]')
              .val(value);
            if (required) {
              $(getId + " .step-inline-form .property-group")
                .find('input[name="' + name + '"]')
                .prev("label")
                .append('<span class="required">*</span>');
              $(getId + " .step-inline-form .property-group")
                .find('input[name="' + name + '"]')
                .attr("required", "");
            }
          } else if (type == "file") {
            {
              $(getId + " .step-inline-form .property-group").append(
                '<div class="' +
                  dependClass +
                  '  input-group"><label>' +
                  label +
                  '</label><input type="' +
                  type +
                  '" name=' +
                  name +
                  "></div>"
              );
              //$(getId+ ' .step-inline-form .property-group').find('input[name="'+name+'"]').val(value);
              if (required) {
                $(getId + " .step-inline-form .property-group")
                  .find('input[name="' + name + '"]')
                  .prev("label")
                  .append('<span class="required">*</span>');
                $(getId + " .step-inline-form .property-group")
                  .find('input[name="' + name + '"]')
                  .attr("required", "");
              }
            }
          } else if (type === "multi-checkbox") {
            //const existingArray = JSON.parse(value)
            var string = value;
            var stringArray = string.split(", ");
            var options = storedProprties.find(
              (property) => property.name === name
            ).options;
            var multiselct = required
              ? '<div class="' +
                dependClass +
                ' input-group"><label>' +
                label +
                '<span class="required">*</span></label><ul required>'
              : '<div class="' +
                dependClass +
                ' input-group"><label>' +
                label +
                "</label><ul>";

            options.forEach(function (item, index) {
              var checked = stringArray.includes(item.value);
              if (checked) {
                multiselct +=
                  "<li name='" +
                  item.value +
                  "'><input type='checkbox' checked  name='" +
                  name +
                  "' value='" +
                  item.value +
                  "' id='" +
                  (name + index) +
                  "'/ ><label for='" +
                  (name + index) +
                  "'>" +
                  item.label +
                  "</label></li>";
              } else {
                multiselct +=
                  "<li name='" +
                  item.value +
                  "'><input type='checkbox'  name='" +
                  name +
                  "' value='" +
                  item.value +
                  "' id='" +
                  (name + index) +
                  "'/ ><label for='" +
                  (name + index) +
                  "'>" +
                  item.label +
                  "</label></li>";
              }
            });
            multiselct += "</ul></div>";
            $(getId + " .step-inline-form .property-group").append(multiselct);
          } else if (type === "radio") {
            //const existingArray = JSON.parse(value)
            var string = value.replace("[", "").replace("]", "");
            var stringArray = string.split(", ");
            console.log(stringArray);

            var options = storedProprties.find(
              (property) => property.name === name
            ).options;
            var multiselct = required
              ? '<div class="' +
                dependClass +
                ' input-group"><label>' +
                label +
                '<span class="required">*</span></label><ul required>'
              : '<div class="' +
                dependClass +
                ' input-group"><label>' +
                label +
                "</label><ul>";

            options.forEach(function (item, index) {
              var checked = stringArray.includes(item.value);
              if (checked) {
                multiselct +=
                  "<li name='" +
                  item.value +
                  "'><input type='radio' checked  name='" +
                  name +
                  "' value='" +
                  item.value +
                  "' id='" +
                  (name + index) +
                  "'/ ><label for='" +
                  (name + index) +
                  "'>" +
                  item.label +
                  "</label></li>";
              } else {
                multiselct +=
                  "<li name='" +
                  item.value +
                  "'><input type='radio'  name='" +
                  name +
                  "' value='" +
                  item.value +
                  "' id='" +
                  (name + index) +
                  "'/ ><label for='" +
                  (name + index) +
                  "'>" +
                  item.label +
                  "</label></li>";
              }
            });
            multiselct += "</ul></div>";
            $(getId + " .step-inline-form .property-group").append(multiselct);
          } else if (type === "textarea") {
            var textarea = required
              ? '<div class="' +
                dependClass +
                ' input-group"><label>' +
                label +
                '<span class="required">*</span></label><textarea  colspan="4" rowspan="4" name="' +
                name +
                '" required>'
              : '<div class="' +
                dependClass +
                ' input-group"><label>' +
                label +
                '</label><textarea colspan="4" rowspan="4" name="' +
                name +
                '" value="' +
                value +
                '">';

            textarea += value + "</textarea></div>";
            $(getId + " .step-inline-form .property-group").append(textarea);
          } else {
            var options = storedProprties.find(
              (property) => property.name === name
            ).options;
            var selectbox = required
              ? '<div class="' +
                dependClass +
                ' input-group"><label>' +
                label +
                '<span class="required">*</span></label><select  value="' +
                value +
                '" name="' +
                name +
                '" required>'
              : '<div class="' +
                dependClass +
                ' input-group"><label>' +
                label +
                '</label><select name="' +
                name +
                '" value="' +
                value +
                '">';
            selectbox += "<option value=''>Please Select an Option</option>";
            options.forEach(function (item) {
              selectbox +=
                "<option value='" +
                item.value +
                "'>" +
                item.label +
                "</option>";
            });
            selectbox += "</select></div>";
            $(getId + " .step-inline-form .property-group").append(selectbox);
            $(getId + " .step-inline-form .property-group")
              .find('[name="' + name + '"]')
              .val(value);
          }

          if ((type == "checkbox" || type == "radio") && value == "true") {
            $(getId + " .step-inline-form .property-group")
              .find('[name="' + name + '"]')
              .prop("checked", true);
          }
        });

        $(getId).addClass("show-edit-box");
      });

      $('input[type="checkbox"]').each(function (e) {
        var name = $(this).attr("name");
        if ($(this).is(":checked")) {
          $(this)
            .parent(".input-group")
            .nextAll(".is-dependent." + name)
            .show();
        } else {
          $(this)
            .parent(".input-group")
            .nextAll(".is-dependent." + name)
            .hide();
        }
      });
    });
  },
});

var propertiesObj = {};

$(document).on(
  "change",
  ".property-group .input-group input,.property-group .input-group textarea,.property-group .input-group select",
  function (e) {
    var name = $(this).attr("name");
    var value = $(this).text();
    var type = $(this).attr("type");

    if ($(this).closest(".input-group").hasClass("multi-checkbox")) {
      var array = [];
      $(this)
        .closest(".input-group")
        .find("input")
        .each(function () {
          if ($(this).is(":checked")) {
            array.push($(this).val());
          }
        });

      propertiesObj[name] = array?.join(";");
    } else if ($(this).closest(".input-group").hasClass("checkbox")) {
      if (
        $(this).parent(".input-group").hasClass("parent_depender") &&
        event.target.checked
      ) {
        $(this)
          .parent(".input-group")
          .nextAll(".is-dependent." + name)
          .show();
        console.log("true");
      } else {
        $(this)
          .parent(".input-group")
          .nextAll(".is-dependent." + name)
          .hide();
      }

      propertiesObj[name] = event.target.checked;
    } else {
      if (type !== "file") {
        propertiesObj[name] = e.target.value;
      } else {
        console.log("e.target", e.target.files[0]);
      }
    }
  }
);

$(".step-inline-form").each(function () {
  $(this).validate({
    submitHandler: function (form) {
      $(form).addClass("is-loading");
      var SendInfo = {
        properties: propertiesObj,
        objectId: $(".slider-inline-main-wrapper").attr("data-id"),
      };
      $.ajax({
        type: "post",
        url: "/_hcms/api/edit_wedding",
        data: JSON.stringify(SendInfo),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {
          for (const key in propertiesObj) {
            $(".slider-inline-content .property_internal." + key).text(
              propertiesObj[key]
            );
          }
          $(form).next(".thank-you-msg").show();
          $(form).hide();
          $(form).removeClass("is-loading");
          Toastify({
            text: "Your information has been updated;",
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
          var index = $(form).closest(".slide-box").index() + 1;
          console.log("sdsdsdd", index);
          $(form)
            .closest(".slider-inline-main-wrapper")
            .find(".slide-step")
            .eq(index)
            .click();
        },
      });

      //     $(form).submit();
    },
  });
});

$(".close_btn").click(function () {
  $(".edit-form-modal").removeClass("show-edit-box");
});
