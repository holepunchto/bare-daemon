cmake_minimum_required(VERSION 3.31)

find_package(cmake-bare REQUIRED PATHS node_modules/cmake-bare)
find_package(cmake-fetch REQUIRED PATHS node_modules/cmake-fetch)

project(bare_daemon C)

fetch_package("github:holepunchto/libdaemon#82c08de")

add_bare_module(bare_daemon)

target_sources(
  ${bare_daemon}
  PRIVATE
    binding.c
)

target_link_libraries(
  ${bare_daemon}
  PRIVATE
    $<TARGET_OBJECTS:daemon>
  PUBLIC
    daemon
)
