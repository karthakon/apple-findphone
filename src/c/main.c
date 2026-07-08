#include <pebble.h>

static Window *s_window;
static MenuLayer *s_menu_layer;
static const char *MENU_ITEMS[] = { "Find Phone" };
static const int NUM_ITEMS = 1;

// Tell the phone to fire the notification.
static void send_find_phone(void) {
  DictionaryIterator *iter;
  if (app_message_outbox_begin(&iter) != APP_MSG_OK) {
    return;
  }
  dict_write_uint8(iter, MESSAGE_KEY_FIND_PHONE, 1);
  app_message_outbox_send();
}

// MenuLayer callbacks
static uint16_t get_num_sections_cb(MenuLayer *layer, void *context) {
  return 1;
}

static uint16_t get_num_rows_cb(MenuLayer *layer, uint16_t section, void *context) {
  return NUM_ITEMS;
}

static void draw_row_cb(GContext *ctx, const Layer *cell_layer, MenuIndex *cell_index, void *context) {
  menu_cell_basic_draw(ctx, cell_layer, MENU_ITEMS[cell_index->row], NULL, NULL);
}

static void select_cb(MenuLayer *layer, MenuIndex *cell_index, void *context) {
  send_find_phone();
}

static void window_load(Window *window) {
  Layer *window_layer = window_get_root_layer(window);
  GRect bounds = layer_get_bounds(window_layer);
  s_menu_layer = menu_layer_create(bounds);
  menu_layer_set_callbacks(s_menu_layer, NULL, (MenuLayerCallbacks){
    .get_num_sections = get_num_sections_cb,
    .get_num_rows = get_num_rows_cb,
    .draw_row = draw_row_cb,
    .select_click = select_cb,
  });
  menu_layer_set_click_config_onto_window(s_menu_layer, window);
  layer_add_child(window_layer, menu_layer_get_layer(s_menu_layer));
}

static void window_unload(Window *window) {
  menu_layer_destroy(s_menu_layer);
}

static void inbox_received_cb(DictionaryIterator *iter, void *context) {}
static void inbox_dropped_cb(AppMessageResult reason, void *context) {}
static void outbox_sent_cb(DictionaryIterator *iter, void *context) {}
static void outbox_failed_cb(DictionaryIterator *iter, AppMessageResult reason, void *context) {}

int main(void) {
  app_message_register_inbox_received(inbox_received_cb);
  app_message_register_inbox_dropped(inbox_dropped_cb);
  app_message_register_outbox_sent(outbox_sent_cb);
  app_message_register_outbox_failed(outbox_failed_cb);
  app_message_open(64, 64);

  s_window = window_create();
  window_set_window_handlers(s_window, (WindowHandlers){
    .load = window_load,
    .unload = window_unload,
  });
  window_stack_push(s_window, true);

  app_event_loop();
  window_destroy(s_window);
}
