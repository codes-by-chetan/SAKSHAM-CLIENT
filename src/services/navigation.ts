import { router } from "expo-router";

export function openAuth() {
    router.replace("/(auth)/welcome");
}

export function openDashboard() {
    router.replace("/(main)/dashboard");
}

export function openLanguage() {
    router.replace("/(auth)/language");
}